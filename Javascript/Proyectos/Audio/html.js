function playByteArray(byteArray)
{

	var arrayBuffer = new ArrayBuffer(byteArray.length)
	var bufferView = new Uint8Array(arrayBuffer)
	for (i = 0; i < byteArray.length; i++)
	{
		bufferView[i] = byteArray[i]
	}
	context.decodeAudioData(arrayBuffer, function(buffer)
	{
		buf = buffer
		play()
	})
}
function play()
{
	var source = context.createBufferSource()
	source.buffer = buf
	source.connect(context.destination)
	source.start(0)
}
