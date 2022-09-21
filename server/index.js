const {readFlieSync,writeFileSync}=require('fs')

writeFileSync(
    './data.txt',
    'incoming streams of data'
)


console.log('server');