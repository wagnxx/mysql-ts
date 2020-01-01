module.exports = {
    error(app,logger){
        app.use(async(ctx,next)=>{
            try{
                await next();
            }catch(error){
                logger.error(error);
                ctx.status=error.status || 500;
                ctx.body=await error
            }
        })
        app.use(async(ctx,next)=>{
            await next();
            if(ctx.status!==404){
                return;
            }else{
                // ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>'
            }
        });
    
        
    }
};