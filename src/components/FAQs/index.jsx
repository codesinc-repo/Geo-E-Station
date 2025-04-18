import React from "react";
import { Accordion, Container, Row, Col } from 'react-bootstrap';

function Faqs() {
  return (
    <section className="FAQ pt-5 pb-5" style={{ backgroundColor: "#33DB4A26" }}>
      <Container>
        <Row>
          {/* First Column */}
          <Col md={6}>

            <h1 className="" style={{ borderBottom: "4px solid #33db4a ", width: "140px" }}>FAQs</h1>
          </Col>
          {/* Second Column */}
          <Col md={6}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  1:  What is GeoEstate and how does it work?
                </Accordion.Header>
                <Accordion.Body>
                  GeoEstate is an app that brings together properties from
                  multiple real estate portals such as Idealista, Fotocasa, and
                  LuxuryEstate into a single platform. With GeoEstate, you can
                  search for properties using a dynamic interface, receive
                  personalized alerts, and view geolocated properties on a map.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  2:  Does GeoEstate include international properties?
                </Accordion.Header>
                <Accordion.Body>
                  Yes, GeoEstate allows you to access international properties
                  from portals such as LuxuryEstate, ThinkSpain, and Keyro, as
                  well as local portals such as Idealista and Fotocasa. This
                  allows you to search for properties in different markets from
                  a single platform.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  3:  How does geolocation work in GeoEstate?
                </Accordion.Header>
                <Accordion.Body>
                  Geolocation in GeoEstate allows you to view properties
                  directly on a map, helping you locate them precisely. You can
                  even activate properties on the map and use them as a guide as
                  you move around to find them in person.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  4:  Can I customize property alerts in GeoEstate?
                </Accordion.Header>
                <Accordion.Body>
                  Yes, GeoEstate offers custom alerts that notify you when new
                  properties matching your search criteria are listed. You can
                  tailor alerts based on your location preferences, property
                  type, price, and more.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  5:  Is GeoEstate better than Betterplace or Casafari?
                </Accordion.Header>
                <Accordion.Body>
                  GeoEstate offers several advantages over Betterplace and
                  Casafari, such as broader integration with international
                  portals, advanced geolocation features, and the ability to
                  manage buyer profiles to view personalized properties on the
                  map.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  6:  How can I create a buyer profile on GeoEstate?
                </Accordion.Header>
                <Accordion.Body>
                  Creating a buyer profile on GeoEstate is easy. Simply
                  your search preferences, and the app will show you only the
                  properties that fit your needs. You'll also receive
                  personalized alerts when new properties matching your profile
                  are added.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header>
                  7:  Does GeoEstate offer a free trial?
                </Accordion.Header>
                <Accordion.Body>
                  Yes, GeoEstate offers a 14-day free trial on any of its
                  subscription plans. During this period, you can explore all
                  the features and decide if it is the right platform for you
                  without any commitment.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header>
                  8:  Does GeoEstate allow generating PDF exposés for buyers?
                </Accordion.Header>
                <Accordion.Body>
                  Yes, GeoEstate allows Professional and Premium plan users to
                  generate PDF exposés to share with interested buyers. This
                  makes it easier to present properties in a professional
                  manner.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="8">
                <Accordion.Header>
                  9:  Is GeoEstate available on mobile devices?
                </Accordion.Header>
                <Accordion.Body>
                  Yes, GeoEstate is available for iOS and Android mobile
                  devices. You can download the app from Google Play or App
                  Store and access all the features from your smartphone.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="9">
                <Accordion.Header>
                  10:  Can I change plans at any time?
                </Accordion.Header>
                <Accordion.Body>
                  Yes, you can change or cancel your subscription at any time
                  from your account settings.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Faqs;
