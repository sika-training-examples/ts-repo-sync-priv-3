import React from "react";
import App from "next/app";
import site from "@app/trainera.cz/config";
import Link from "next/link";
import styled from "styled-components";
import Layout from "@app/ondrejsika-theme/layouts/Layout";

import ThemeNavbar from "@app/ondrejsika-theme/components/Navbar";
import ThemeFooter from "@app/ondrejsika-theme/components/Footer";
import ThemeLanguageSwitch from "@app/ondrejsika-theme/components/LanguageSwitch";
import Button from "@app/ondrejsika-theme/components/Button";
import Twitter from "@app/data/pictures/social-networks/twitter_sq.svg";
import Linkedin from "@app/data/pictures/social-networks/linkedin_sq.svg";

// Imported CSS
import "bootstrap-css-only/css/bootstrap.min.css";
import "../css/index.sass";

const Hide = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;
const Row = styled.div`
  display: flex;
  padding-top: 1em;
`;

const Icon = styled.span`
  margin: 0.8em;
  :first-child {
    margin-left: 0;
    padding-left: 0;
  }
`;
const Img = styled.img`
  height: 50px;
`;

const LanguageSwitch = <ThemeLanguageSwitch site={site} />;

const Navbar = (
  <ThemeNavbar
    site={site}
    NavName="Trainera"
    links={[
      ["DOMŮ", "/"],
      [
        "KURZY",
        [
          ["GIT", "/skoleni/git"],
          ["GITLAB CI", "/skoleni/gitlab-ci"],
          ["DOCKER", "/skoleni/docker"],
          ["KUBERNETES", "/skoleni/kubernetes"],
          ["RANCHER", "/skoleni/rancher"],
          ["ANSIBLE", "/skoleni/ansible"],
          ["TERRAFORM", "/skoleni/terraform"],
          ["PROMETHEUS", "/skoleni/prometheus"],
          ["PROXMOX", "/skoleni/proxmox"],
          ["ELK / EFK", "/skoleni/elk"],
          ["REACT & NEXT.JS", "/skoleni/react"],
          ["VIDEOKURZY", "/videokurzy"]
        ]
      ],
      ["TERMÍNY", "/verejne-terminy"],
      ["KONTAKT", "/kontakt"]
    ]}
  />
);

const Footer = (
  <ThemeFooter
    site={site}
    firstColumn={
      <ThemeFooter.Wrapper>
        <ThemeFooter.H4>Trainera</ThemeFooter.H4>
        <p>
          <ThemeFooter.A href="mailto:sales@trainera.io">
            sales@trainera.io
          </ThemeFooter.A>
          <br />
          <ThemeFooter.A href="tel:+420773452376">
            +420 773 452 376
          </ThemeFooter.A>
          <br />
          <Row>
            <ThemeFooter.A href="https://twitter.com/traineraio">
              <Icon>
                <Img src={Twitter.src} />
              </Icon>
            </ThemeFooter.A>
            <br />
            <ThemeFooter.A href="https://www.linkedin.com/company/traineraio">
              <Icon>
                <Img src={Linkedin.src} />
              </Icon>
            </ThemeFooter.A>
          </Row>
        </p>
        <Hide>
          <table className="contact-table table-borderless">
            <tbody>
              <tr>
                <td>IČ:</td>
                <td>08591491</td>
              </tr>
              <tr>
                <td>DIČ:</td>
                <td>CZ08591491</td>
              </tr>
              <tr>
                <td>Účet:&nbsp;&nbsp;&nbsp;</td>
                <td>2801705982/2010</td>
              </tr>
            </tbody>
          </table>
        </Hide>
      </ThemeFooter.Wrapper>
    }
    secondColumn={
      <ThemeFooter.Wrapper>
        <ThemeFooter.H4>Nejoblíbenější kurzy</ThemeFooter.H4>
        <ul>
          {[
            ["Docker", "/skoleni/docker"],
            ["Kubernetes", "/skoleni/kubernetes"],
            ["Gitlab CI", "/skoleni/gitlab-ci"],
            ["Terraform", "/skoleni/terraform"],
            ["Prometheus", "/skoleni/prometheus"],
            ["Rancher", "skoleni/rancher"]
          ].map((el, i) => {
            return (
              <ThemeFooter.Li key={i}>
                <Link href={el[1]}>
                  <ThemeFooter.A href={el[1]} className="a-underline">
                    {el[0]}
                  </ThemeFooter.A>
                </Link>
              </ThemeFooter.Li>
            );
          })}
        </ul>
      </ThemeFooter.Wrapper>
    }
    thirdColumn={
      <ThemeFooter.Wrapper>
        <ThemeFooter.H4>Zajímají Vás novinky?</ThemeFooter.H4>
        <p>Odebírejte můj newsletter a budete v obraze!</p>
        <div className="input-group">
          <Button
            site={site}
            type="outline-secondary"
            href="https://sika.link/newsletter"
          >
            Přihlásit se k odběru článků a novinek
          </Button>
        </div>
      </ThemeFooter.Wrapper>
    }
  />
);

class MyApp extends App {
  constructor(...args) {
    super(...args);
    this.site = site;
  }
  render() {
    const { Component, pageProps } = this.props;
    pageProps.site = this.site;
    return (
      <Layout
        LanguageSwitch={LanguageSwitch}
        Navbar={Navbar}
        Footer={Footer}
        {...pageProps}
      >
        <Component lang={site.lang} {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
