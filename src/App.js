import React, { useState, useEffect } from 'react';
import logo from './images/abc_logo.svg';
import styled from 'styled-components';
import container from './container/content.json';
import './App.css';

const App = () => {
    const [pages, setPages] = useState(null);
    const [slug, setSlug] = useState(container.pages[0].slug);

    //On page load set data from json file to local state
    useEffect(() => {
        setPages(container.pages);
    }, []);

    //map through pages array to load each page
    const handlePage = () => {
        return pages?.length > 0 ? (
            pages.map((page, index) => {
                if (page.slug === slug) {
                    return page.blocks.map((block) => {
                        const image = require(`./images/${block.background}`);
                        return (
                            <div key={index}>
                                <div
                                    className='background-image'
                                    style={{
                                        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${image.default})`,
                                    }}
                                ></div>
                                <div className='middle-content'>
                                    <div className='main-content'>
                                        <div className='content headline'>
                                            <span>{block.headline}</span>
                                        </div>
                                        <div className='content subhead'>
                                            <span>{block.subhead}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='cta'>
                                    <span className='cta-text'>
                                        {block.cta}
                                    </span>
                                    <span className='cta-button'>
                                        <a href='#'>
                                            LET'S TALK.{' '}
                                            <span className='right-arrow'>
                                                &#8594;
                                            </span>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        );
                    });
                }
            })
        ) : (
            <div className='loading-page'>
                <div className='loading-ring'></div>
                <span>Loading</span>
            </div>
        );
    };

    return (
        <StyledWrapper>
            <header>
                <img src={`${logo}`} alt='logo for the website'></img>
                <button>Contact Us</button>
            </header>
            <nav>
                <ul>
                    {pages?.length > 0
                        ? pages.map((page, index) => {
                              return (
                                  <li key={index}>
                                      <button
                                          onClick={() => setSlug(page.slug)}
                                          style={{
                                              color:
                                                  page.slug === slug
                                                      ? '#FFBF04'
                                                      : '#fff',
                                          }}
                                      >
                                          {page.title}
                                      </button>
                                  </li>
                              );
                          })
                        : null}
                </ul>
            </nav>
            <main>{handlePage()}</main>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.main`
    max-width: 1440px;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    margin: auto;
    min-height: 100vh;

    header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: auto;
        padding: 1rem 11% 0 10%;

        button {
            margin-top: 0.5rem;
            width: 8.5rem;
            height: 2.5rem;
            border: solid 1px #ffffff;
            background: transparent;
            font-family: HelveticaNeue;
            font-size: 1rem;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: center;
            color: #ffffff;
        }
    }

    nav {
        padding-top: 1rem;
        padding-left: 10%;
        max-width: 1440px;
        margin: auto;

        ul {
            list-style-type: none;
            font-family: HelveticaNeue;

            button {
                font-family: HelveticaNeue;
                background-color: transparent;
                border: none;
                text-decoration: none;
                color: #ffffff;
                margin-bottom: 0.3rem;
            }

            button:focus {
                color: #d6c100;
                outline: none;
            }
        }
    }

    .background-image {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: -100;
        background-size: cover;
        background-position: center center;
        animation: fadeInAnimation 1.5s;
    }

    .main-content {
        position: absolute;
        top: 25%;
        right: 0;
        left: 0;
        max-width: 1440px;
        display: flex;
        flex-direction: column;
        .content {
            height: auto;
            display: flex;
            align-self: center;
            justify-self: center;
        }

        .headline {
            width: 100%;
            font-size: calc(
                60px + (100 - 60) * ((100vw - 320px) / (1440 - 320))
            );
            font-family: HelveticaNeue;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: left;
            font-weight: bold;
            animation: ease-in-out slideInFromTop 2s;
        }

        .subhead {
            color: #ffffff;
            font-family: HelveticaNeue;
            font-size: 14px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.86;
            letter-spacing: normal;
            width: 70%;
            margin: auto;
            margin-top: 2rem;
            float: right;
            animation: ease-in-out slideInSubtext 2s;
        }
    }

    .cta {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        max-width: 1440px;
        background: #ffffff;
        font-family: HelveticaNeue;
        text-align: center;
        display: flex;
        flex-direction: column;
        height: 10rem;
        margin: auto;
        z-index: 100;
        align-items: center;
        justify-content: center;
        animation: ease-in-out slideUp 2s;

        .cta-text {
            font-size: calc(
                15px + (25 - 15) * ((100vw - 320px) / (1440 - 320))
            );
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.33;
            letter-spacing: -0.63px;
        }

        .cta-button {
            display: flex;
            align-items: center;
            font-size: 0.8rem;
            letter-spacing: 1px;
            height: 4rem;

            a {
                text-decoration: none;
                color: black;
            }

            .right-arrow {
                color: #ffbf04;
                font-size: 1.3rem;
                margin-left: 0.5rem;
            }
        }
    }

    .loading-page {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 2rem;

        span {
            margin-top: 2rem;
            font-size: 4rem;
            font-family: HelveticaNeue;
        }

        .loading-ring {
            display: inline-block;
            width: 80px;
            margin: auto;
            height: 80px;
        }
        .loading-ring:after {
            content: ' ';
            display: block;
            width: 64px;
            height: 64px;
            margin: 8px;
            border-radius: 50%;
            border: 6px solid #000;
            border-color: #000 transparent #000 transparent;
            animation: lds-dual-ring 1.2s linear infinite;
        }
    }
    @keyframes slideUp {
        0% {
            transform: translateY(200%);
        }
        100% {
            transform: translateY(0);
        }
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }


    @keyframes slideInFromTop {
        0% {
            transform: translateY(-200%);
        }
        100% {
            transform: translateY(0);
        }
    }

    @keyframes slideInSubtext {
        0% {
            transform: translateY(-400%);
        }
        100% {
            transform: translateY(0);
        }
    }

    @keyframes fadeInAnimation {
        0% {
            opacity: 0.2;
        }
        100% {
            opacity: 1;
        }
    }
    @media all and (min-width: 850px) {
        .main-content {
            position: absolute;
            top: 30%;
            right: 11%;
            left: 10%;
            padding-top: 3rem;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin: auto;
            text-align: left;

            .headline {
                margin-bottom: 12rem;
            }

            .subhead {
                padding-top: 1rem;
            }
        }
        .cta {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: auto;
            margin: 1rem 11% 0rem 10%;

            .cta-text {
                padding-left: 5%;
            }

            .cta-button {
                padding-top: 0;
                padding-right: 23%;
            }
        }
    }

    @media all and (max-width: 390px) {
        .cta {
            height: 9rem;
            margin-left: 0;
            margin-right: 0;
        }
    }



    @keyframes mobileSlidIn {
        0% {
            transform: translateX(200%);
        }
        100% {
            transform: translateY(0);
        }
    }
`;

export default App;
