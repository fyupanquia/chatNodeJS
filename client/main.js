var socket= io.connect('http://localhost:6677',{'forceNew':true})

socket.on('messages',function(data){
	console.log(data)
	render(data)
})

function render(data){
	let html = data.map(function(message,index){
		return (`
				<div class='message' >
					<strong>${message.nickname}</strong> dice:
					<p>${message.text}</p>
				</div>
				`)
	}).join(' '),
	msg_div = document.getElementById('messages')

	msg_div.innerHTML = html
	msg_div.scrollTop = msg_div.scrollHeight
}

function addMessage(e){
	var nickname = document.getElementsByName("nickname")[0],
		message ={
			nickname : nickname.value,
			text : document.getElementsByName("text")[0].value
		}

	nickname.style.display = 'none'
	socket.emit('add-message',message)
	return false;
}