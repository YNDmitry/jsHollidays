function randomRange(min, max) {
  return ((Math.random()*(max-min)) + min)
}

let SCREEN_WIDTH = window.innerWidth
let SCREEN_HEIGHT = window.innerHeight

let container

let particle

let camera
let scene
let renderer

let mouseX = 0
let mouseY = 0

let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2

let particles = []
let particleImage = new Image()
particleImage.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82015/snowflake.png' 



const init = () => {

	container = document.createElement('div')
	document.body.appendChild(container)

	camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 )
	camera.position.z = 1000

	scene = new THREE.Scene()
	scene.add(camera)
		
	renderer = new THREE.CanvasRenderer()
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
	let material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } )
		
	for (let i = 0; i < 1000; i++) {

		particle = new Particle3D( material)
		particle.position.x = Math.random() * 2000 - 1000
		particle.position.y = Math.random() * 2000 - 1000
		particle.position.z = Math.random() * 2000 - 1000
		particle.scale.x = particle.scale.y =  1
		scene.add( particle )
		
		particles.push(particle)
	}

	container.appendChild( renderer.domElement )


	document.addEventListener( 'mousemove', onDocumentMouseMove, false )
	document.addEventListener( 'touchstart', onDocumentTouchStart, false )
	document.addEventListener( 'touchmove', onDocumentTouchMove, false )
	
	setInterval( loop, 1000 / 60 )
	
}

const onDocumentMouseMove = event => {
	mouseX = event.clientX - windowHalfX
	mouseY = event.clientY - windowHalfY
}

const onDocumentTouchStart = event => {

	if ( event.touches.length == 1 ) {

		event.preventDefault()

		mouseX = event.touches[ 0 ].pageX - windowHalfX
		mouseY = event.touches[ 0 ].pageY - windowHalfY
	}
}

const onDocumentTouchMove = event => {

	if ( event.touches.length == 1 ) {

		event.preventDefault()

		mouseX = event.touches[ 0 ].pageX - windowHalfX
		mouseY = event.touches[ 0 ].pageY - windowHalfY
	}
}

const loop = () => {

for (let i = 0; i < particles.length; i++)	{

		let particle = particles[i]
		particle.updatePhysics()

		with(particle.position) {
			if ( y < -1000) y += 2000
			if (x > 1000) x -= 2000
			else if (x < -1000) x += 2000
			if (z > 1000) z -= 2000
			else if (z<-1000) z += 2000
		}				
	}

	camera.position.x += ( mouseX - camera.position.x ) * 0.05
	camera.position.y += ( - mouseY - camera.position.y ) * 0.05
	camera.lookAt(scene.position)

	renderer.render( scene, camera )
}

init()
