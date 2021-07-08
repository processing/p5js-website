// vert file and comments from adam ferriss
// https://github.com/aferriss/p5jsShaderExamples

// our vertex data
attribute vec3 aPosition;

// our texcoordinates
attribute vec2 aTexCoord;

// this is a variable that will be shared with the fragment shader
// we will assign the attribute texcoords to the varying texcoords to move them from the vert shader to the frag shader
// it can be called whatever you want but often people prefix it with 'v' to indicate that it is a varying
varying vec2 vTexCoord;

void main() {

    // copy the texture coordinates
    vTexCoord = aTexCoord;

    // copy the position data into a vec4, using 1.0 as the w component
    vec4 positionVec4 = vec4(aPosition, 1.0);

    // scale the rect by two, and move it to the center of the screen
    // if we don't do this, it will appear with its bottom left corner in the center of the sketch
    // try commenting this line out to see what happens
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

    // send the vertex information on to the fragment shader
    gl_Position = positionVec4;
}
