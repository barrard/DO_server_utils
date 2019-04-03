var exec = require('child_process').exec;
function execute(command, callback){
  exec(command, function(error, stdout, stderr){ callback(stdout); });
};
const CUTOFF = 0.1 //10% free memory

/* Start the memoery check timer */
init()


function check_free_mem(){
  execute("free  | awk '{print $2}' ", (stdout)=>{
    /* get total mem */
    console.log(stdout)// the one we want is [1]
    var total = stdout.split('\n')[1]
    console.log({total})

    execute("free  | awk '{print $4}' ", (stdout)=>{
      /* get used and or free mem */
      console.log(stdout)
      var free = stdout.split('\n')[1]
      console.log({free})

      var usage = free/total
console.log(usage)
      if(usage < CUTOFF)
        execute('pm2 restart all', (stdout)=>console.log(stdout))
console.log('shut down'  )
//       execute('service apache2 restart', ()=>{console.log('bye?')})

   
    })
  })
}


function init(){
  setInterval(()=>{
    check_free_mem()
  }, 1000*60*60)//1 hour
}



/* compare the ratio/ decide what to do */
