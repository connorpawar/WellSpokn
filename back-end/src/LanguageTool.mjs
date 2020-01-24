import fs from 'fs'
import cp from 'child_process'

class LanguageTool{
    async LangToolCall(transcript, username, title){

        fs.writeFile('langtool.txt', transcript, (err) => {

            if (err) throw err;
            var child = cp.spawn(
                'java', ['-jar', 'LanguageTool-4.7/languagetool-commandline.jar', '-l', 'en-US', '--json', 'langtool.txt']
            );
            child.stdout.on('data', function(data){
				console.log(data.toString());
            })
            child.stderr.on('data', function(data){
                console.log(data.toString());
            })
        });
        fs.writeFile('langtool.txt', "", (err) => {
            if (err) throw err;
        });

    }

    async LangToolHelp(errors, username, title){
        console.log(errors);
    }
}
export default LanguageTool;
