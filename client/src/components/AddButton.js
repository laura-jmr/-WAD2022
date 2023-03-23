import React from 'react'

export default function AddButton({ onClick }) {

  return (
    <div className="innerMapBoxAddButtonContainer" id="addButton">
        <button id="AddButtonMain" onClick={onClick}>Add</button>
    </div>
  )
}
