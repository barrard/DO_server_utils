var exec = require('child_process').exec;
function execute(command, callback){
  exec(command, function(error, stdout, stderr){ callback(stdout); });
};
const CUTOFF = 0.8 //80%

/* Start the memoery check timer */
init()


function check_free_mem(){
  execute("free  | awk '{print $2}' ", (stdout)=>{
    /* get total mem */
    console.log(stdout)// the one we want is [1]
    var total = stdout.split('\n')[1]
    console.log({total})

    execute("free  | awk '{print $3}' ", (stdout)=>{
      /* get used and or free mem */
      console.log(stdout)
      var used = stdout.split('\n')[1]
      console.log({used})

      var usage = used/total
      if(usage > CUTOFF)
        execute('sudo reboot', (stdout)=>console.log(stdout))
        // execute('service apache2 restart', ()=>{console.log('bye?')})

      console.log(used/total)
    })
  })
}


function init(){
  setInterval(()=>{
    check_free_mem()
  }, 1000*60*60)//1 hour
}



/* compare the ratio/ decide what to do */