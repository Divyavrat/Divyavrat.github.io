var shape;
var list = document.getElementById("shapelist");
var scene, camera, renderer;
var mesh,meshtext;
var controls,keyboard;
var speed=0.1,zoomspeed=10;
var autorotate=true;
var geometry, material;

//Initial shape
showshape(6);
animate();

//Main Function to show different shapes
function showshape(newshape){

// Remove if shape already exists
if(shape){
document.body.removeChild( renderer.domElement );
list.getElementsByTagName("li")[shape-1].className = '';
desctext=document.getElementById("desc"+shape);
if(desctext)desctext.style.display="none";
}
shape=newshape;
// Add active class to highlight current button
list.getElementsByTagName("li")[shape-1].className = 'active';
desctext=document.getElementById("desc"+shape);
if(desctext)desctext.style.display="block";
switch(shape)
{
	case(1):
	// Square
	geometry = new THREE.BoxGeometry( 200, 200, 0 );
	break;
	
	case(2):
	// Rectangle
	geometry = new THREE.BoxGeometry( 100, 200, 0 );
	break;
	
	case(3):
	// Circle
	geometry = new THREE.CircleGeometry( 100, 26 );
	break;
	
	case(4):
	// Triangle
	geometry = new THREE.Geometry();
	var v1 = new THREE.Vector3(0,0,0);
	var v2 = new THREE.Vector3(100,100,0);
	var v3 = new THREE.Vector3(-100,100,0);

	geometry.vertices.push( v1 );
	geometry.vertices.push( v2 );
	geometry.vertices.push( v3 );

	geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
	geometry.computeFaceNormals();
	break;

	case(5):
	// Cuboid
	geometry = new THREE.BoxGeometry( 100, 200, 100 );
	break;
	
	case(6):
	// Cube
	geometry = new THREE.BoxGeometry( 150, 150, 150 );
	break;
	
	case(7):
	// set up the sphere vars
	var radius = 100,
    segments = 26,
    rings = 26;
	// create a new mesh with
	// sphere geometry
	geometry = new THREE.SphereGeometry(radius,segments,rings);
	break;
	
	case(8):
	// Cone
	geometry = new THREE.CylinderGeometry( 0, 100, 250, 50,false );
	break;
	
	case(9):
	// Cylinder
	geometry = new THREE.CylinderGeometry( 80, 80, 150, 50,false );
	break;
	
	//Point
	case(10):
	geometry = new THREE.BoxGeometry( 1, 1, 0 );
	material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } );
	break;
	
	//Line
	case(11):
	geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3( -100, 0, 0 ),
		new THREE.Vector3( 100, 40, 0 )
	);
	material = new THREE.LineBasicMaterial({
		color: 0xec5e00
	});
	break;
	
	//Curve
	case(12):
	var curve = new THREE.CubicBezierCurve3(
	new THREE.Vector3( -100, 0, 0 ),
	new THREE.Vector3( -50, 150, 0 ),
	new THREE.Vector3( 200, 150, 0 ),
	new THREE.Vector3( 100, 0, 0 )
	);

	geometry = new THREE.Geometry();
	geometry.vertices = curve.getPoints( 50 );
	material = new THREE.LineBasicMaterial( { color : 0xffffff } );
	break;
	
	default:
	geometry = new THREE.BoxGeometry( 100, 100, 100 );
	material = new THREE.MeshPhongMaterial( { color: 0xD00000, wireframe: false } );
	break;
}

// Create mesh
if(shape==4)mesh= new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
else if(shape==10){mesh = new THREE.Mesh( geometry, material );}
else if(shape==11||shape==12){mesh = new THREE.Line( geometry, material );}
else{mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );}

// Rotate mesh
if(shape==5||shape==6){mesh.rotation.x=50;mesh.rotation.y=-50;}
if(shape==8||shape==9){mesh.rotation.x=-150;mesh.rotation.y=+50;}

	// draw label text on canvas

	// create a canvas element
	var canvas1 = document.createElement('canvas');
	var context1 = canvas1.getContext('2d');
	context1.font = "Bold 40px Arial";
	context1.fillStyle = "rgba(255,255,255,0.95)";
	// Get label from button text
    context1.fillText(list.getElementsByTagName("a")[shape-1].innerHTML, 100, 50);
    
	// canvas contents will be used for a texture
	var texture1 = new THREE.Texture(canvas1) 
	texture1.needsUpdate = true;
      
    var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide } );
    material1.transparent = true;

    meshtext = new THREE.Mesh(
    new THREE.PlaneGeometry(canvas1.width, canvas1.height),material1);
	meshtext.position.x = -200;

// Recreate scene
init();
}
    
    function init() {

		//Scene
        scene = new THREE.Scene();

		//Camera
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 500;
		camera.lookAt(mesh.position);
		
		// create point lights
		var pointLight1 = new THREE.PointLight(0xF0FFFF);

		// set light position
		pointLight1.position.x = 100;
		pointLight1.position.y = 0;
		pointLight1.position.z = 300;

		// add lights the scene
		scene.add(pointLight1);
		
		// Add objects
		scene.add( mesh );scene.add( meshtext );
		
		mesh.position.x = 100;
		mesh.position.z = 100;
		
		renderer = new THREE.WebGLRenderer();
        renderer.setSize( 9*window.innerWidth/10, 8*window.innerHeight/10 );

        // CONTROLS
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		keyboard = new THREEx.KeyboardState();
		
		document.body.appendChild( renderer.domElement );

    }

    function animate() {

        requestAnimationFrame( animate );

		//Rotate Player
        if(autorotate){mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;}
        
		renderer.render( scene, camera );
	
	// Rotate Buttons Shortcuts
	if(keyboard.pressed("up")||keyboard.pressed("Q")||keyboard.pressed("q"))
	{rotateBack();}
	if(keyboard.pressed("down")||keyboard.pressed("E")||keyboard.pressed("e"))
	{rotateFront();}
	if(keyboard.pressed("left")||keyboard.pressed("A")||keyboard.pressed("a"))
	{rotateLeft();}
	if(keyboard.pressed("right")||keyboard.pressed("D")||keyboard.pressed("d"))
	{rotateRight();}
	if(keyboard.pressed("W")||keyboard.pressed("w"))
	{rotateUp();}
	if(keyboard.pressed("S")||keyboard.pressed("s"))
	{rotateDown();}

	if(keyboard.pressed("Z")||keyboard.pressed("z"))
	{zoomIn();}
	if(keyboard.pressed("X")||keyboard.pressed("x"))
	{zoomOut();}

	// Toggle Button Shortcuts
	if(keyboard.pressed("T")||keyboard.pressed("t"))
	{toggleAutoRotate();}

	controls.update();
    }

	// Old used methods to add controls and shortcuts.
	//document.getElementById("main").onkeydown=function(){control();};
	//document.getElementById("main").addEventListener("keydown", control);
	//document.getElementById("main").addEventListener("onclick", getfar);
	//document.getElementById("main").addEventListener("onmousemove", lookatit);
	
	if(renderer.domElement) {
    renderer.domElement.className += renderer.domElement.className ? ' response' : 'response';
	}

// Toggle Button
function toggleAutoRotate()
{autorotate=!autorotate;
document.getElementById("autorotbutton").className=document.getElementById("autorotbutton").className ? '' : 'active';}

// Rotate Buttons
function rotateBack()
{mesh.rotation.z -= speed;}
function rotateFront()
{mesh.rotation.z += speed;}
function rotateLeft()
{mesh.rotation.x -= speed;}
function rotateRight()
{mesh.rotation.x += speed;}
function rotateUp()
{mesh.rotation.y += speed;}
function rotateDown()
{mesh.rotation.y -= speed;}

// Zoom Buttons
function zoomIn()
{if(camera.position.z>mesh.position.z)camera.position.z -= zoomspeed;}
function zoomOut()
{if(camera.position.z<mesh.position.z+500)camera.position.z += zoomspeed;}