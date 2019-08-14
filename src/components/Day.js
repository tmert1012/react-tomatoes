import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import WeatherIcon from 'react-icons-weather';

class Day extends Component {

    render() {
        const { day, forecast } = this.props

        return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Img variant="top" src={`../icons/${forecast.icon}`} style={{fill: "#00B1E1"}}/>
                    <WeatherIcon name="owm" iconId="200" flip="horizontal" rotate="90" style={{color: "#00B1E1", width: '100px'}} />

                    <Card.Title>{day.title}</Card.Title>
                    <Card.Text>
                        {forecast.title}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

}

function mapStateToProps({ weather }, { day }) {
    const keys = Object.keys(weather)
    const randKey = keys[Math.floor(Math.random()*keys.length)]

    return {
        day,
        forecast: weather[randKey]
    }
}

export default connect(mapStateToProps)(Day)