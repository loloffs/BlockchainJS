const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.calculateHash()
  }
  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.creatGenesisBlock()]
  }

  creatGenesisBlock() {
    return new Block(0, "05/11/2021", "Genesis Block", "0")
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash
    newBlock.hash = newBlock.calculateHash()
    this.chain.push(newBlock)
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }
    return true
  }

}

let lukeCoin = new Blockchain()
lukeCoin.addBlock(new Block(1, "05/11/2021", { amount: 5 }))
lukeCoin.addBlock(new Block(2, "05/12/2021", { amount: 2 }))



// Show blockchain:
// console.log(JSON.stringify(lukeCoin, null, 4))

// Check validity of blockchain:
// console.log("Is blockchain valid?", lukeCoin.isChainValid())
 