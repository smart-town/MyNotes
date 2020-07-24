function testDo(content) {
	console.log("-----this is testsub BEGIN-----");
	console.log(require.main.filename);
	console.log("CONTENT-b:",content);
	console.log("-----this is testsub END-----");
}
module.exports = {testDo}