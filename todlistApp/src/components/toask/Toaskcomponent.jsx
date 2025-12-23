import React, { Children } from 'react'
import "./Toaskcomponent.css"

function Toaskcomponent({title, children }) {
  return (
    <div className="toaskcomponent-container">
        <h3 className="toaskcomponent-title">{title}</h3>
    <div className="toaskcomponent">
      {Children.map(children, (child, index) => (
        <div
          className="toast"
          key={index}
        >
          {child}
        </div>
      ))}
    </div>
    </div>
  )
}

export default Toaskcomponent
