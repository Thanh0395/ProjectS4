import React from 'react';

// import Swiper React components
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { Link } from 'react-router-dom';

// images
import team_img_3 from '../../assets/images/testimonial-slide-img-3.png';
import team_img_2 from '../../assets/images/testimonial-slide-img-2.png';
import team_img_1 from '../../assets/images/testimonial-slide-img-1.png';

const TeamSlider = () => {

    const data = [
        {
            image: team_img_3,
            name: 'Anna Adams',
            designation: 'Marketing',
            social: [
                {
                    to: '#',
                    icon: 'fab fa-twitter'
                },
                {
                    to: '#',
                    icon: 'fab fa-facebook'
                },
                {
                    to: '#',
                    icon: 'fab fa-linkedin-in'
                },
                {
                    to: '#',
                    icon: 'fab fa-youtube'
                }
            ]
        },
        {
            image: team_img_2,
            name: 'Jake Blake',
            designation: 'Development',
            social: [
                {
                    to: '#',
                    icon: 'fab fa-twitter'
                },
                {
                    to: '#',
                    icon: 'fab fa-facebook'
                },
                {
                    to: '#',
                    icon: 'fab fa-linkedin-in'
                },
                {
                    to: '#',
                    icon: 'fab fa-youtube'
                }
            ]
        },
        {
            image: team_img_1,
            name: 'Karen Gavin',
            designation: 'Manager',
            social: [
                {
                    to: '#',
                    icon: 'fab fa-twitter'
                },
                {
                    to: '#',
                    icon: 'fab fa-facebook'
                },
                {
                    to: '#',
                    icon: 'fab fa-linkedin-in'
                },
                {
                    to: '#',
                    icon: 'fab fa-youtube'
                }
            ]
        }
    ]

    return (
        <div className="team-slider">
            <Swiper
                modules={[Navigation]}
                navigation={{
                    nextEl: '.team-slider-navigation-next',
                    prevEl: '.team-slider-navigation-prev'
                }}
                loop={true}
                centeredSlides={true}
                initialSlide={1}
                breakpoints={{
                    0: {
                        slidesPerView: 1.5,
                        spaceBetween: 30
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 0
                    }
                }}
            >
                {
                    data.map((member, key) => {
                        return (
                            <SwiperSlide key={key}>
                                <div className="team-single drop-shadow-team-1">
                                    <div className="team-single-wrapper">
                                        <div className="image">
                                            <div className="image-wrapper">
                                                <div className="image-inner">
                                                    <img src={member.image} alt="team-member" />
                                                </div>
                                            </div>
                                        </div>
                                        <h3>{member.name}</h3>
                                        <p>{member.designation}</p>
                                        <div className="social social-1">
                                            <ul>
                                                {
                                                    member.social.map((single, innerkey) => {
                                                        return (
                                                            <li key={innerkey}>
                                                                <Link to={single.to}>
                                                                    <i className={single.icon}></i>
                                                                </Link>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <div className="team-slider-navigation slider-navigation">
                <div className="team-slider-navigation-prev">
                    <i className="las la-long-arrow-alt-left"></i>
                </div>
                <div className="team-slider-navigation-next">
                    <i className="las la-long-arrow-alt-right"></i>
                </div>
            </div>
        </div>
    );
};

export default TeamSlider;
