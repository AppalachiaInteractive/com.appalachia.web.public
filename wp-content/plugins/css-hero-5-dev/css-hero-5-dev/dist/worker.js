// QUESTO E' IL WORKER GIUSTO

if ('function' === typeof importScripts){
	importScripts('less.js'); // https://github.com/openstyles/less-bundle
}

self.onmessage = ({data}) => {
	let {type,value} = data
	const ret = {type,value}

	if (type === 'determineEdits'){
		const ok = {}
		for (let t in ret.value){
			let Input = ret.value[t]
			let Output = Input;
			while (Output !== (Output = Output.replace(/\{[^{}]*\}/g, "|"))); 
			Output = Output.split('|')
			Output.forEach((e,i)=>{Output[i] = Output[i].trim()})
			ok[t] = Output;
		}
		for (let t in ok){
			for (let k in ok[t]) if (ok[t][k] === '') ok[t].splice(k,1)
			if (ok[t].length === 0) delete ok[t]
		}
		ret.value = ok;
	}

	if (type === 'getColor'){

		less.render(value,(error,output)=>{
			ret.error = (error) ? error : false;
			ret.render = output ? output.css : false
			ret.var = data.var;
		})
	}

	if (type === 'getColorForVar'){
		less.render(value,(error,output)=>{
			ret.error = (error) ? error : false;
			ret.render = output ? output.css : false
			ret.var = data.var;
		})
	}

	if (type === 'defineColor'){

		less.render(value,(error,output)=>{
			ret.error = (error) ? error : false;
			ret.render = output ? output.css : false
			
		})
	}


	if (type === 'renderLessSnippet'){

		less.render(value,(error,output)=>{
			ret.error = (error) ? error : false;
			ret.render = output ? output.css : false
		})
	}

	/*
	if (type === 'less'){
		less.render(value,(error,output)=>{
			if (!error) ret.value = output.css;
		})
	}
	*/
	if (type === 'snippetsLess'){
		less.render(value,(error,output)=>{
			if (!error){
				ret.value = output.css;
			} else {
				ret.value = JSON.stringify(error)
			}
		})
	}
	if (type === 'selectorsScan'){
		value = value.split(/\n|\t|;|,/).join('|');
		value = value.split('||').join('|')
		value = value.split('||').join('|')
		ret.value = value.split('|')
	}
	if (type === 'setup'){
		// GRAB IMPORTS
		let imps = []
		if (value.indexOf('@import ') > -1){
			imps = value.match(/@import (.*?)\);/g) || []
			imps.map(i=>{
				value = value.replace(i,'')
			})
		}

		
		
		////////
		
		less.render(value,(error,output)=>{
			ret.error = (error) ? error : false;
			ret.css = (error) ? '' : imps.join('\n')+output.css
			ret.render = data.render;
		})
	}
	
	
	
	self.postMessage(ret)
}