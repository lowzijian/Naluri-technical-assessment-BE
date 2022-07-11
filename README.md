### Project overview
Naluri Space Project HTTP server that is capable of
- Calculating Pi to increasing accuracy e.g. 3, 3.1, 3.14, 3.141, 3.1415… etc.
- Everytime the server has calculated the next decimal precision, it should store
the most accurate value
- When the server is queried via an HTTP GET request, it will respond with the
most accurate value that the server has calculated

### Built with
- [Node.js](https://nodejs.org/en/)
- [Fastify](https://www.fastify.io/)
- [bignumber.js](https://mikemcl.github.io/bignumber.js/)
- [boom](https://hapi.dev/module/boom/)
- [toad-scheduler](https://github.com/kibertoad/toad-scheduler)

### Running Locally

Clone the project and make it your working directory:
```sh
git clone https://github.com/lowzijian/Naluri-technical-assessment-BE.git
cd Naluri-technical-assessment-BE
```

Install Dependecies:
```sh
npm install
```

Run the project:
```sh
npm run dev
```

### Overview
- `config/*` - contains all the configurations. eg:PORT number
- `controller/*` - contains all the business logics of the application
- `routes/*` - contains all routing related logics
- `utils/*` - contains all helper functions

### The process of calculate PI 
The server run a job every 5 seconds to calculate PI to increasing accuracy using the `Machin-like formula`, where the formula is transformed to code thanks to [Ken Ward](https://trans4mind.com/personal_development/JavaScript/longnumPiMachin.htm). The more accuracy PI value will be updated in text file in `/data/pi.txt` and the pointer is updated in text file in `/data/pi_pointer.txt`

### Concerns
- There are few formulas out there which are meant for the calculation of PI and I did not carry out very detailed research. I do not know which formula will result in the most accuracy result.
- Is there a better way to save a large decimal numbers in a text file which is accumulating over time

### Future thoughts
- Need to relearn my add maths 
