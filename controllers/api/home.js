var wpi=$('wiring-pi');


 module.exports={
    get:function(id, mode, value, callback){
        if(typeof(mode)!='undefined')
        {
            switch(mode)
            {
                case 'in':
                    wpi.setPinMode(id, wpi.modes.INPUT);
                    break;
                case 'out':
                    wpi.setPinMode(id, wpi.modes.OUTPUT);
                    break;
                case 'pwm_out':
                    wpi.setPinMode(id, wpi.modes.PWM_OUTPUT);
                    break;
            }
            return callback(200);
        }
        wpi.digitalWrite(id, value);
        callback(200);
    },
    set:function(id, callback)
    {
        module.exports.get(id, undefined, wpi.HIGH, callback);
    },
    reset:function(id, callback)
    {
        module.exports.get(id, undefined, wpi.LOW, callback);
    },
    press:function(id, repeat, callback)
    {
        var repeatArray=[];
        repeatArray.length=repeat || 1;
        $.eachAsync(repeatArray, function(index, item, next)
        {
            module.exports.reset(id, function(){
                module.exports.set(id, next);
            });
        }, function(){
            callback(200);
        });
    }
 };