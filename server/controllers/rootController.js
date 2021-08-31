import User from "../models/User";
import MyLog from "../models/MyLog";
import bcrypt from "bcrypt";

// React 랜더링 전 User Session 정보 확인

export const home = (req, res) => {
    return res.json(req.session);
};

export const getLogout = (req, res) => {
    req.session.destroy();
    return res.status(200);
};

export const postMyLogInfo = async(req, res) => {
    const { user : { _id : id } } = req.session;
    const { user } = req.session;
    try{
        const myLog = await MyLog.findOne({userId : id});
        if(myLog){
            console.log("❤check");
            return res.json({myLog, user}); 
        }
        else {
            return res.json({ error : "Please login first."})
        }
    } catch {
        return res.json({ error : "Error❌" })
    }
};

// Git 로그인 
export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GITHUB_CLIENT,
        allow_signup: false,
        scope: "read:user user:email"
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.status(200);
};

export const finishGithubLogin = async(req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GITHUB_CLIENT,
        client_secret: process.env.GITHUB_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    // (내가만든 finalUrl에 POST요청을 보내고 있음)
    // fetch를 통해 데이터를 받아오고
    const tokenRequest = await ( 
        await fetch(finalUrl, {
        method:"POST",
        // json으로 return 받기위해 추가, 안하면 text형태임
        headers: {
            Accept: "application/json",
        },
    })
    ).json();
    // 받아온 데이터에서 json을 추출
    // access_token을 가지고 api접근해서 user정보를 얻는다.
    // return res.send(JSON.stringify(json));
    if ("access_token" in tokenRequest){
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`,
                },
            })
        ).json();
        const emailData = await(await fetch(`${apiUrl}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`,
                },
            })
        ).json();
        const emailObj = emailData.find((email) => email.primary === true && email.verified === true);
        if (!emailObj){
            return res.json({ error : "/login"});
        } 
        let user = await User.findOne({email: emailObj.email});
        if(!user){
            user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.name,
                username: userData.login,
                email: emailObj.email,
                password: "",
                socialOnly: true,
                location: userData.location,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.status(200);
    } else {
        return res.json({ error : "/login"});
    }
};


// User 정보 

export const postJoin = async (req, res) => {
    const { email, username, password, password2 } = req.body;
    if(password !== password2){
        console.log("❌ password is wrong.");
        return res.json({ error : "Password confirmation does not match." });
    }
    const exists = await User.exists({$or: [{username}, {email}]});
    if(exists){
        console.log("❌ already using.");
        return res.json({ error : "This Username / Email is already using."});
    }
    try{
        await User.create({
            email,
            username,
            password,
        });
        console.log("✅ Join Completion");
        return res.status(200).json({ info : "Welcome, Joined!", joinOK : "success"});
    }catch(error){
        console.log("❌ something error");
        return res.status(400).json({ error : error.message });
    }
};

export const postLogin = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email, socialOnly: false});
    if(!user){
        return res.json({ error : "An account with this email does not exists."});
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if(!passwordCheck){
        return res.json({ error : "Wrong Password!"});
    }
    console.log("✅ Login Success");
    req.session.loggedIn = true;
    req.session.user = user;
    return res.status(200).json({ loggedIn : true, loginData : req.session.user });
};

export const postUserEdit = async(req, res) => {
    const { username, password, password1, password2 } = req.body;
    const { user : { _id }} = req.session;
    const user = await User.findById({_id});
    const oldPasswordCheck = await bcrypt.compare(password, user.password);
    // 기존 비밀번호 확인
    if(!oldPasswordCheck){
        return res.json({ error : "Wrong Password!"});
    }
    // username만 변경
    if(username !== user.username && password === password1){
        const exists = await User.exists({username});
        if(exists){
            return res.json({ error : "This Username is already using."});
        } else {
            const updateUser = await User.findByIdAndUpdate(_id, {
                username,
            }, {new: true});
            req.session.user = updateUser;
            return res.status(200).json({ info : "Username Updated!"});
        }
    }
    // password만 변경
    if(password !== password1 && username === user.username ){
        if(password1 !== password2){
            return res.json({ error : "Change of Password confirmation does not match." });
        }
        user.password = password1;
        await user.save();
        req.session.user.password = user.password;
        return res.status(200).json({ info : "Password Updated!"});
    }

    // 둘다 변경
    if(username !== user.username && password !== password1){
        const exists = await User.exists({username});
        if(exists){
            return res.json({ error : "This Username is already using."});
        } else if (password1 !== password2) {
            return res.json({ error : "Change of Password confirmation does not match." });
        } else {
            const updateUser = await User.findByIdAndUpdate(_id, 
            {
                username,
            }, {new: true});
            user.password = password1;
            await user.save();
            req.session.user = updateUser;
            return res.status(200).json({ info : "All Updated!"});
        }
    }
    return res.end();
};


// Log 저장
export const postLogSave = async(req, res) => {
    const { logInfo } = req.body;
    const { session : { user : { _id : id}}} = req;
    const myLog = await MyLog.findOne({userId : id});
    if(!myLog){
        try{
            await MyLog.create({
                userId : id,
                contents : logInfo,
            })
            return res.status(200).json({ saveOk : "success"});
        } catch {
            return res.status(400);
        }
    } else {
        try {
            await MyLog.findOneAndUpdate({userId : id},
                { $push : { contents : logInfo },
            })
            return res.status(200).json({ updateOk : "success"});
        } catch(error) {
            return res.status(400);
        }
    }
};

// Log 삭제
export const postMyLogDelete = async(req, res) => {
    const {objectId} = req.body;
    await MyLog.findOneAndUpdate({}, {
        $pull : { contents : { 
            _id : objectId 
        }}
    }
    );
    return res.send("success");
};


// User 탈퇴
export const getUserDelete = async(req, res) => {
    const { session : { user : { _id }}} = req;
    req.session.destroy();
    await MyLog.findOneAndDelete({userId : _id})
    await User.findByIdAndDelete(_id);
    return res.status(200);
};