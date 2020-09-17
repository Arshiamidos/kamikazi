let i = 1;
let wait = 1000;
let penaltyTime = 1 * 60 * 1000;
let userPerPage = 50;
let FollowOrUnfollow = true ? "Follow" : "Unfollow";
let username = "torvalds";//tj,sindresorhus,isaacs,...
let MAX=122000/50;
let hasPenalty=false;
(async () => {
    while (i < MAX) {

        let w = window.open("https://github.com/" + username + "?page=" + (i) + "&tab=followers&rnd=" + Math.random()*1000)
        
        w.onload = async () => {
           
            if (w.document.querySelectorAll("input[value='" + FollowOrUnfollow + "']").length == 0) {
                hasPenalty=true
                return;
            }
            w.document.querySelectorAll("input[value='" + FollowOrUnfollow + "']")
            .forEach(async a => {
                await new Promise(r => setTimeout(_ => { r() }, wait));
                a.click();
            });

            await new Promise(r => setTimeout(_ => { r() },
                w.document.querySelectorAll("input[value='" + FollowOrUnfollow + "']").length 
                * wait
                
            ));
            i++;
            w.close();
        }
        
        
        await new Promise(r => setTimeout(_ => { r() }, userPerPage*wait));

    }


})();
