import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, Badge } from 'mdb-react-ui-kit';
import { Diamond } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import "../Custom/ProfileCard2.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function ProfileCard2({ user, gem, userLevel }) {
  const [showImageIcon, setShowImageIcon] = useState();
  const imageIcon = localStorage.getItem("imageIcon");
  return (
    <section style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="position-relative gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <div className="position-relative">
                    <MDBCardImage src={`http://localhost:8080/${user.avatar}`}
                      alt="Avatar" className="my-5 p-3" style={{ width: '200px' }} fluid />

                    {/* Icon at bottom right */}
                    <div className="position-absolute bottom-0 end-0 p-2">
                      {imageIcon == "ImageHung/icon_image_default.jpg" ? (
                        <img src={`${imageIcon}`} alt="Icon" style={{ width: '40px', height: '40px' }} />
                      ) : (
                        //<img src={`localhost:8080/${imageIcon}`} alt="Icon" style={{ width: '40px', height: '40px' }} />
                        //https://vapeaz.com.vn/wp-content/uploads/2023/12/explore-the-nature.png
                        <img
                        src={`http://localhost:8080/${imageIcon}`}
                          style={{
                            width: '50px',
                            height: '50px',
                            boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.8)',
                            borderRadius: '50%'
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <MDBTypography tag="h5">{user.name}</MDBTypography>
                  <Dropdown data-bs-theme="dark" style={{ opacity: 0.4, width: '60%' }}>
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                      Action
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/change-password">Change Password</Dropdown.Item>
                      <Dropdown.Item href="/forgot-password">Forgot Password</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{user.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h6">Date of Birth</MDBTypography>
                        <MDBCardText className="text-muted">{user.dateOfBirth}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h6"><Diamond /> Gem</MDBTypography>
                        <MDBCardText className="text-muted">{gem.current}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h6"><StarIcon /> Level</MDBTypography>
                        <MDBCardText className="text-muted">{userLevel.level}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}