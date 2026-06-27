import * as React from 'react'

declare module 'meshline' {
  export const MeshLineGeometry: any
  export const MeshLineMaterial: any
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any
      meshLineMaterial: any
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any
      meshLineMaterial: any
    }
  }
}
