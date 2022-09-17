import * as THREE from 'three'

export default class Ball {
    constructor(x, y, z, radius, color, mass, xM, yM, zM) {
        this.position = new THREE.Vector3(x, y, z)
        this.radius = radius
        this.mass = mass
        this.color = color
        this.momentum = new THREE.Vector3(xM, yM, zM)
        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(this.radius, 32, 32),
            new THREE.MeshBasicMaterial({ color: this.color })
        )
        this.mesh.position.x = this.position.x
        this.mesh.position.y = this.position.y
        this.mesh.position.z = this.position.z
    }

    getVelocity() {
        return this.momentum.clone().divideScalar(this.mass)
    }
}