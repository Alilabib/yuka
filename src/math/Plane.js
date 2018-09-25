import { Vector3 } from './Vector3.js';

const v1 = new Vector3();
const v2 = new Vector3();

/**
* Class representing a plane in 3D space. The plane is specified in Hessian normal form.
*
* @author {@link https://github.com/Mugen87|Mugen87 }
*/
class Plane {

	/**
	* Constructs a new plane with the given values. The sign of __Plane#constant__ determines the side of the plane on which the origin is located.
	*
	* @param {Vector3} normal - The normal vector of the plane.
	* @param {number} constant - The distance of the plane from the origin.
	*/
	constructor( normal = new Vector3( 0, 0, 1 ), constant = 0 ) {

		this.normal = normal;
		this.constant = constant;

	}

	/**
	* Sets the given values to this plane.
	*
	* @param {Vector3} normal - The normal vector of the plane.
	* @param {number} constant - The distance of the plane from the origin.
	* @return {Plane} A reference to this plane.
	*/
	set( normal, constant ) {

		this.normal = normal;
		this.constant = constant;

		return this;

	}

	/**
	* Copies all values from the given plane to this plane.
	*
	* @param {Plane} plane - The plane to copy.
	* @return {Plane} A reference to this plane.
	*/
	copy( plane ) {

		this.normal.copy( plane.normal );
		this.constant = plane.constant;

		return this;

	}

	/**
	* Creates a new plane and copies all values from this plane.
	*
	* @return {Plane} A new plane.
	*/
	clone() {

		return new this.constructor().copy( this );

	}

	/**
	* Computes the signed distance from the given 3D vector to this plane.
	* The sign of the distance indicates the half-space in which the points lies.
	* Zero means the point lies on the plane.
	*
	* @param {Vector3} point - A point in 3D space.
	* @return {number} The signed distance.
	*/
	distanceToPoint( point ) {

		return this.normal.dot( point ) + this.constant;

	}

	/**
	* Sets the values of the plane from the given normal vector and a coplanar point.
	*
	* @param {Vector3} normal - A normalized vector.
	* @param {Vector3} point - A coplanar point.
	* @return {Plane} A reference to this plane.
	*/
	fromNormalAndCoplanarPoint( normal, point ) {

		this.normal.copy( normal );
		this.constant = - point.dot( this.normal );

		return this;

	}

	/**
	* Sets the values of the plane from three given coplanar points.
	*
	* @param {Vector3} a - A coplanar point.
	* @param {Vector3} b - A coplanar point.
	* @param {Vector3} c - A coplanar point.
	* @return {Plane} A reference to this plane.
	*/
	fromCoplanarPoints( a, b, c ) {

		v1.subVectors( c, b ).cross( v2.subVectors( a, b ) ).normalize();

		this.fromNormalAndCoplanarPoint( v1, a );

		return this;

	}

	/**
	* Returns true if the given plane is deep equal with this plane.
	*
	* @param {Plane} plane - The plane to test.
	* @return {boolean} The result of the equality test.
	*/
	equals( plane ) {

		return plane.normal.equals( this.normal ) && plane.constant === this.constant;

	}

}

export { Plane };
