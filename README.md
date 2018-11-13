# MCMC [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Markov chain Monte Carlo

## Overview

This program implements the Metropolis-Hastings algorithm in order to find the most probable graphs arising from a set number of nodes. For this program, the number of nodes is 4. User can specify the number of times the Metropolis-Hastings algorithm is iterated. The relative probability of the graphs are given by the following function:

![](http://latex.codecogs.com/gif.latex?f%20%28%20%5C%7B%20s_i%20%2C%20X_i%20%5C%7D%2C%20%5C%7Bs_j%20%2C%20X_j%5C%7D%29%20%3D%20e%5E%7B-%28%5Ctheta%28s_j%2CX_j%29%20-%20%5Ctheta%28s_i%2CX_i%29%29/T%7D)

where,

![](http://latex.codecogs.com/gif.latex?%5Ctheta%28s_i%2CX_i%29%20%3D%20r%5Csum_e%20w_e&plus;%5Csum_k%5EM%20%5Csum_%7Be%20%5Cin%20p_%7Bs_i%20k%7D%7D%20w_e)

This equation considers two sums. The first is the sum of all edge weights in a graph, multiplied by parameter r, which is set equal to 1. The second is the sum of the shortest distance from a source node to each other node in the connected graph, where the source node is set to node 0 @ a coordinate of (0,0)

Implementing the Metropolis-Hastings algorithm, this program considers the current graph and a proposed graph to produce A, the probability of acceptance. If A=1, the proposed state is automatically accepted. A is calculated as follows:

![](http://latex.codecogs.com/gif.latex?A%20%3D%20min%5C%7B%201%2C%20%5Cfrac%7B%5Cpi%20%28x_j%29%20q%28x_i%7Cx_j%29%7D%7B%5Cpi%20%28x_i%29q%28x_j%7Cx_i%29%7D%20%5C%7D)

A is then compared to a randomly generated decimal between 0 & 1, called u. The proposed state is accepted unless u > A.

The program runs through user specified iterations, comparing the current graph to proposed graphs, to find the most probable graph



## Installation

```sh
$ npm install --save Markov-Chain-Monte-Carlo
```

## Usage

```js
node app.js;


```
## License

MIT © [ConnorCox1996]()


[npm-image]: https://badge.fury.io/js/Markov-Chain-Monte-Carlo.svg
[npm-url]: https://npmjs.org/package/Markov-Chain-Monte-Carlo
[travis-image]: https://travis-ci.org/ConnorCox1996/Markov-Chain-Monte-Carlo.svg?branch=master
[travis-url]: https://travis-ci.org/ConnorCox1996/Markov-Chain-Monte-Carlo
[daviddm-image]: https://david-dm.org/ConnorCox1996/Markov-Chain-Monte-Carlo.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ConnorCox1996/Markov-Chain-Monte-Carlo
[coveralls-image]: https://coveralls.io/repos/ConnorCox1996/Markov-Chain-Monte-Carlo/badge.svg
[coveralls-url]: https://coveralls.io/r/ConnorCox1996/Markov-Chain-Monte-Carlo
[![Coverage Status](https://coveralls.io/repos/github/ConnorCox1996/Markov-Chain-Monte-Carlo/badge.svg?branch=master)](https://coveralls.io/github/ConnorCox1996/Markov-Chain-Monte-Carlo?branch=master)
