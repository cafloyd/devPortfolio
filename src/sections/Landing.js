import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Heading, Flex, Box, Text } from 'rebass/styled-components';
import TextLoop from 'react-text-loop';
import Section from '../components/Section';
import SocialLink from '../components/SocialLink';
import Triangle from '../components/Triangle';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['35vh', '80vh']}
      width={['95vw', '60vw']}
    />

    <Triangle
      color="primaryMedium"
      height={['38vh', '80vh']}
      width={['50vw', '35vw']}
    />

    <Triangle
      color="primary"
      height={['25vh', '35vh']}
      width={['75vw', '60vw']}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={['20vh', '20vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

const stickToTop = {
  marginTop: '0em',
};
const headingStyle = {
  fontFamily: 'Lato, sans-serif',
};
const subHeadingStyle = {
  marginRight: 'auto',
  marginLeft: 'auto',
  fontFamily: 'Nunito',
};
const socialStyle = {
  top: '3em',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
};

const LandingPage = () => (
  <Section.Container id="home" Background={Background}>
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          contentfulAbout {
            name
            roles
            socialLinks {
              id
              url
              name
              fontAwesomeIcon
            }
          }
          site {
            siteMetadata {
              deterministicBehaviour
            }
          }
        }
      `}
      render={({ contentfulAbout, site }) => {
        const { name, socialLinks, roles } = contentfulAbout;
        const { deterministicBehaviour } = site.siteMetadata;

        return (
          <Fragment>
            <div style={stickToTop}>
              <Heading
                textAlign="center"
                as="h1"
                color="primaryMedium"
                style={headingStyle}
                fontSize={[6, 7]}
                mb={[3, 4, 5]}
              >
                {name}
              </Heading>

              <Heading
                as="h2"
                color="primary"
                fontSize={[5, 6]}
                mb={[3, 10]}
                textAlign="center"
                style={subHeadingStyle}
              >
                <TextLoop interval={1500}>
                  {roles
                    .sort(() => deterministicBehaviour || Math.random() - 0.5)
                    .map((text) => (
                      <Text width={[300, 500]} key={text}>
                        {text}
                      </Text>
                    ))}
                </TextLoop>
              </Heading>
            </div>
            <Flex style={socialStyle}>
              {socialLinks.map(({ id, ...rest }) => (
                <Box mx={3} fontSize={[5, 6, 6]} key={id}>
                  <SocialLink {...rest} />
                </Box>
              ))}
            </Flex>
          </Fragment>
        );
      }}
    />
  </Section.Container>
);

export default LandingPage;
