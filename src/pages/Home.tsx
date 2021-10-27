import { CardGroup } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import '../assets/styles/home.css'
import CustomNavbar from '../components/CustomNavbar'
import React from 'react'

function Home() {
  return (
    <>
      <CustomNavbar />
      <h3 className="subtitle-home"> 2018 S1 </h3>
      <CardGroup>
        <Card className="card-style-home-first">
          <Card.Title>Course 1</Card.Title>
          <Card.Subtitle>Subtitle 1</Card.Subtitle>
        </Card>
        <Card className="card-style-home-first">
          <Card.Title>Course 2</Card.Title>
          <Card.Subtitle>Subtitle 2</Card.Subtitle>
        </Card>
        <Card className="card-style-home-first">
          <Card.Title>Course 3</Card.Title>
          <Card.Subtitle>Subtitle 3</Card.Subtitle>
        </Card>
        <Card className="card-style-home-first">
          <Card.Title>Course 4</Card.Title>
          <Card.Subtitle>Subtitle 4</Card.Subtitle>
        </Card>
        <Card className="card-style-home-first">
          <Card.Title>Course 5</Card.Title>
          <Card.Subtitle>Subtitle 4</Card.Subtitle>
        </Card>
      </CardGroup>

      <h3 className="subtitle-home"> 2018 S2 </h3>
      <CardGroup>
        <Card className="card-style-home">
          <Card.Title>Course 1</Card.Title>
          <Card.Subtitle>Subtitle 1</Card.Subtitle>
        </Card>
        <Card className="card-style-home">
          <Card.Title>Course 2</Card.Title>
          <Card.Subtitle>Subtitle 2</Card.Subtitle>
        </Card>
        <Card className="card-style-home">
          <Card.Title>Course 3</Card.Title>
          <Card.Subtitle>Subtitle 3</Card.Subtitle>
        </Card>
        <Card className="card-style-home">
          <Card.Title>Course 4</Card.Title>
          <Card.Subtitle>Subtitle 4</Card.Subtitle>
        </Card>
        <Card className="card-style-home">
          <Card.Title>Course 5</Card.Title>
          <Card.Subtitle>Subtitle 4</Card.Subtitle>
        </Card>
      </CardGroup>
    </>
  )
}

export default Home
