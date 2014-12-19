deviceTypes.gpio={
    name:'gpio',
    onChange:function(){
        return 'static';
    },
    onAdd:function(){
        $('<li class="form-group">')
            .append('<div class="col-sm-2"><input type="text" class="commandsName form-control" placeholder="Name" name="commandsName" /></div>')
            .append('<div class="col-sm-10"><input type="text" class="commandsPin form-control" placeholder="Pin (wiringPi number)" name="commandPin" /></div>')
            .appendTo('#commands');
        return false;
    }, 
    onSave:function(data){
        debugger;
        var commands=[];
        $('#commands li').each(function(index, item){
            commands.push({name:$('.commandsName', item).val(), value:$('.commandsPin', item).val()});
        });
        data.append('commands', JSON.stringify(commands));
    },
    onServerSave:function(device, body){
        device.subdevices=[];
        $.each(body, function(index, item){
            if(index=='commands')
            {
                var commands=JSON.parse(item);
                $.each(commands, function(index, command){
                    device.subdevices.push({
                        category:'actuator',
                        type:'switch',
                        name:command.name,
                        commands:{
                            set:'/api/gpio/set/'+command.value,
                            reset:'/api/gpio/reset/'+command.value,
                            press:'/api/gpio/press/'+command.value,
                        }
                    });
                });
            }
        });
    }
}; 