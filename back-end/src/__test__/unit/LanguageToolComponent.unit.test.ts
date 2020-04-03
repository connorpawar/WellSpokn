import LanguageToolComponent from '../../analysis/LanguageToolComponent';
import * as mm from 'music-metadata';

function resolveWrap(arg){
  return new Promise((resolve,reject) =>{
      resolve(arg)
  })
}

describe('LanguageToolComponent class', () => {
  test('LanguageToolComponent analyze works', async (done) => {
    jest.setTimeout(300000);
    var dataInput = {
      transcript : "It is a a trivial proof."
    };

    var component : LanguageToolComponent = new LanguageToolComponent();

    var LanguageToolJson = await component.analyze(dataInput);
    // for(var x of LanguageToolJson["matches"]){
		// 	console.log(x["rule"]["category"]["name"]);
		// }

    //expect(expectedWordsPerMinute).toEqual(actualWordsPerMinute);
    done();
  });
});
