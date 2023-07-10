import React from 'react'
import './Cards.css'

export const Cards = ({img, title, overview}) => {
    return (
        <>
          <div className='cards'>
            <div style={{height: '55%', borderBottom: '1px solid black'}}>
              <img src={img} alt="card-img" />
            </div>
            <h3>{title}</h3>
            <div style={{height: '40%',}}>
              <div className='card-description'>
                <p className='plan-description'>
                {overview}
                </p>
                <button className='plan-card-btn'>
                  Get a quote
                </button>
              </div>
            </div>
          </div>
        </>
    )
}

