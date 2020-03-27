#!/usr/bin/env python3

DEV_SITES = (
    "ondrejsika.io",
    "skolenie-ansible.sk",
    "ondrej-sika.uk",
)
PROD_SITES = (
    "ansible-utbildning.se",
    "docker-utbildning.se",
    "git-utbildning.se",
    "gitlab-utbildning.se",
    "kubernetes-utbildning.se",
    "ondrej-sika.com",
    "ondrej-sika.cz",
    "ondrej-sika.de",
    "trainera.io",
    "git-training.uk",
    "docker-training.uk",
    "kubernetes-training.uk",
    "ansible-training.uk",
    "gitlab-training.uk",
    "ansible-schulung.de",
    "ansible-skoleni.cz",
    "dockerschulung.de",
    "gitlab-ci.cz",
    "kubernetes-schulung.de",
    "skoleni-docker.cz",
    "skoleni-git.cz",
    "skoleni-kubernetes.cz",
    "skolenie-git.sk",
    "skolenie-gitlab.sk",
    "skolenie-docker.sk",
    "skolenie.kubernetes.sk",
    "salzburgdevops.com",
    "skoleni-terraform.cz",
    "skoleni-proxmox.cz",
    "skoleni-prometheus.cz",
    "docker-training.de",
    "docker-training.ch",
    "docker-training.nl",
    "docker-training.at",
    "git-training.nl",
    "skoleni-rancher.cz",
    "ondrejsikalabs.com",
    "sika-kaplan.com",
    "training.kubernetes.is",
    "training.kubernetes.lu",
    "sika-kraml.de",
    "sika-training.com",
    "cal-api.sika.io",
    "ydo.cz",
    "ccc.oxs.cz",
    "sika.blog",
    "static.sika.io",
    "sikahq.com",
)
PRIORITY_SITES = (
    "ondrej-sika.cz",
    "ondrej-sika.com",
    "trainera.io",
    "skoleni.io"
)
SUFFIX = ".panda.k8s.oxs.cz"
with open("sites.txt") as f:
    SITES = list(filter(None, f.read().split("\n")))

out = []
out.append("""# Don't edit this file maually
# This file is generated by ./generate-gitlab-ci.yml

image: ondrejsika/ci

stages:
  - build_js_priority
  - build_docker_priority
  - deploy_dev_priority
  - deploy_prod_priority
  - build_js
  - build_docker
  - deploy_dev
  - deploy_prod

variables:
  DOCKER_BUILDKIT: '1'
""")

for site in SITES:
    out.append("""
%(site)s build js:
  stage: build_js%(priority_suffix)s
  image: node
  variables:
    GIT_CLEAN_FLAGS: none
  script:
    - yarn
    - rm -rf packages/%(site)s/out
    - yarn run static-%(site)s
  except:
    variables:
      - $EXCEPT_BUILD
      - $EXCEPT_BUILD_JS
  only:
    changes:
      - packages/data/**/*
      - packages/common/**/*
      - packages/course-landing/**/*
      - packages/%(site)s/**/*
      - yarn.lock
  artifacts:
    name: %(site)s
    paths:
      - packages/%(site)s/out


%(site)s build docker:
  dependencies:
    - %(site)s build js
  variables:
    GIT_STRATEGY: none
  stage: build_docker%(priority_suffix)s
  script:
    - docker login $CI_REGISTRY -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD
    - cp ci/docker/* packages/%(site)s/
    - docker build -t registry.sikahq.com/www/www/%(site)s:$CI_COMMIT_SHORT_SHA packages/%(site)s
    - rm packages/%(site)s/Dockerfile
    - rm packages/%(site)s/nginx-site.conf
    - docker push registry.sikahq.com/www/www/%(site)s:$CI_COMMIT_SHORT_SHA
  except:
    variables:
      - $EXCEPT_BUILD
      - $EXCEPT_BUILD_DOCKER
  only:
    changes:
      - packages/data/**/*
      - packages/common/**/*
      - packages/course-landing/**/*
      - packages/%(site)s/**/*
      - yarn.lock
""" % {
        "site": site,
        "priority_suffix": "_priority" if site in PRIORITY_SITES else "",
    })

    if site in DEV_SITES:
        out.append("""
%(site)s dev deploy k8s:
  stage: deploy_dev%(priority_suffix)s
  variables:
    GIT_STRATEGY: none
    KUBECONFIG: .kubeconfig
  script:
    - echo $KUBECONFIG_FILECONTENT | base64 --decode > .kubeconfig
    - helm repo add ondrejsika https://helm.oxs.cz
    - helm upgrade --install %(name)s-dev ondrejsika/one-image --set host=%(site)s%(suffix)s --set image=$CI_REGISTRY_IMAGE/%(site)s:$CI_COMMIT_SHORT_SHA --set changeCause=job-$CI_JOB_ID
    - kubectl rollout status deploy %(name)s-dev
  except:
    - master
  except:
    variables:
      - $EXCEPT_DEPLOY
      - $EXCEPT_DEPLOY_K8S
      - $EXCEPT_DEPLOY_DEV
      - $EXCEPT_DEPLOY_DEV_K8S
  only:
    changes:
      - packages/data/**/*
      - packages/common/**/*
      - packages/course-landing/**/*
      - packages/%(site)s/**/*
      - yarn.lock
  environment:
    name: dev %(site)s
    url: https://%(site)s%(suffix)s
  dependencies: []
""" % {
        "site": site,
        "name": site.replace(".", "-"),
        "suffix": SUFFIX,
        "priority_suffix": "_priority" if site in PRIORITY_SITES else "",
    })


    if site in PROD_SITES:
        out.append("""
%(site)s prod deploy k8s:
  stage: deploy_prod%(priority_suffix)s
  variables:
    GIT_STRATEGY: none
    KUBECONFIG: .kubeconfig
  script:
    - echo $KUBECONFIG_FILECONTENT | base64 --decode > .kubeconfig
    - helm repo add ondrejsika https://helm.oxs.cz
    - helm upgrade --install %(name)s ondrejsika/one-image --set host=%(site)s --set image=$CI_REGISTRY_IMAGE/%(site)s:$CI_COMMIT_SHORT_SHA --set changeCause=job-$CI_JOB_ID
    - kubectl rollout status deploy %(name)s
  except:
    variables:
      - $EXCEPT_DEPLOY
      - $EXCEPT_DEPLOY_K8S
      - $EXCEPT_DEPLOY_PROD
      - $EXCEPT_DEPLOY_PROD_K8S
  only:
    refs:
      - master
    changes:
      - packages/data/**/*
      - packages/common/**/*
      - packages/course-landing/**/*
      - packages/%(site)s/**/*
      - yarn.lock
  environment:
    name: prod %(site)s
    url: https://%(site)s
  dependencies: []
""" % {
        "site": site,
        "suffix": SUFFIX,
        "name": site.replace(".", "-"),
        "priority_suffix": "_priority" if site in PRIORITY_SITES else "",
    })

with open(".gitlab-ci.yml", "w") as f:
    f.write("".join(out))
