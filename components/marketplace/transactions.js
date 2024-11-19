import * as fcl from "@onflow/fcl";

export const getOneMarketplaceItem = `
    import Marketplace from 0xCONTRACT
    access(all) fun main(address:Address, tokenID: UInt64): Marketplace.MarketplaceData {
        let account = getAccount(address)
        let marketplace = account.capabilities.borrow<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath)!
        return marketplace.getSaleItem(tokenID: tokenID)
    }

`;

export const getMarketpaceItems = `
    import Marketplace from 0xCONTRACT
    access(all) fun main(address:Address): [Marketplace.MarketplaceData] {
        let account = getAccount(address)
        if let marketplace= account.capabilities.borrow<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath) {
            return marketplace.listSaleItems()
        }
        return []
    }

`;

export const getArtContent = `
    import Marketplace from 0xCONTRACT
    access(all) fun main(address: Address, tokenID: UInt64): String {
        let account = getAccount(address)
        if let marketplace= account.capabilities.borrow<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath) {
          return marketplace.getContent(tokenID: tokenID)
        }
        return ""
    }
`;

export const purchaseItem = `
    import FungibleToken from 0xFungibleToken
    import NonFungibleToken from 0xNonFungibleToken
    import Content, Art, Auction, Versus, Marketplace from 0xCONTRACT

    transaction(marketplace: Address, tokenId: UInt64, amount: UFix64) {
        // reference to the buyer's NFT collection where they
        // will store the bought NFT
    
        let vaultCap: Capability<&{FungibleToken.Receiver}>
        let collectionCap: Capability<&{Art.CollectionPublic}> 
        // Vault that will hold the tokens that will be used
        // to buy the NFT
        let temporaryVault: @FungibleToken.Vault
    
      prepare(account: auth(StorageCapabilities, SaveValue,PublishCapability, BorrowValue) &Account) {
    
            // get the references to the buyer's Vault and NFT Collection receiver
            var collectionCap = account.capabilities.get<&{Art.CollectionPublic}>(Art.CollectionPublicPath)

            // if collection is not created yet we make it.
            if collectionCap != nil {
            if collectionCap == nil {
              // store an empty NFT Collection in acct storage
              acct.save<@NonFungibleToken.Collection>(<- Art.createEmptyCollection(), to: Art.CollectionStoragePath)
              let cap = account.capabilities.storage.issue<&{Art.CollectionPublic}>(Art.CollectionStoragePath)
              account.capabilities.publish(cap, target:Art.CollectionPublicPath)
              self.collectionCap  = account.capabilities.get<&{Art.CollectionPublic}>(Art.CollectionPublicPath)!
            } else {
              self.collectionCap = collectionCap!
            }
            
            self.vaultCap = account.capabilities.get<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
                       
            let vaultRef = account.capabilities.borrow<&FungibleToken.Vault>(from: /storage/flowTokenVault) ?? panic("Could not borrow owner's Vault reference")
    
            // withdraw tokens from the buyer's Vault
            self.temporaryVault <- vaultRef.withdraw(amount: amount)
        }
    
        execute {
            // get the read-only account storage of the seller
            let seller = getAccount(marketplace)
            let marketplace= seller.capabilities.borrow<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath) ?? panic("Could not borrow seller's sale reference")
            marketplace.purchase(tokenID: tokenId, recipientCap:self.collectionCap, buyTokens: <- self.temporaryVault)
        }
    }
     
`;

export const listForSale = `
import FungibleToken from 0xFungibleToken
import Content, Art, Auction, Versus, Marketplace from 0xCONTRACT

//this transaction will setup an newly minted item for sale
transaction(artId: UInt64, price: UFix64) {
    let artCollection:&Art.Collection
    let marketplace: &Marketplace.SaleCollection
    prepare(account: auth(StorageCapabilities, SaveValue,PublishCapability, BorrowValue) &Account) {
        if let marketplace = account.capabilities.borrow<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath) {
          self.marketplace=marketplace
        }else{
             let wallet=  account.capabilities.get<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)!
             let sale <- Marketplace.createSaleCollection(ownerVault: wallet)

             account.save<@Marketplace.SaleCollection>(<- sale, to:Marketplace.CollectionStoragePath)
             let cap = account.capabilities.storage.issue<&{Marketplace.SalePublic}>(Marketplace.CollectionStoragePath)
             account.capabilities.publish(cap, target:Marketplace.CollectionPublicPath)
             self.marketplace=account.stoarge.borrow<&Marketplace.SaleCollection>(from: Marketplace.CollectionStoragePath)!
        }
        self.artCollection= account.storage.borrow<&Art.Collection>(from: Art.CollectionStoragePath)!
    }

    execute {
        let art <- self.artCollection.withdraw(withdrawID: artId) as! @Art.NFT
        self.marketplace.listForSale(token: <- art, price: price)
    }
}
`;

export const sendNFT = `
import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken
import Content, Art, Auction, Versus from 0xCONTRACT

//this transaction will setup an newly minted item for sale
transaction(artId: UInt64, destination: Address) {
    let artCollection: &Art.Collection
    prepare(account: auth(StorageCapabilities, SaveValue,PublishCapability, BorrowValue) &Account) {
        self.artCollection= account.storage.borrow<&Art.Collection>(from: Art.CollectionStoragePath)!
    }

    execute {
        let art <- self.artCollection.withdraw(withdrawID: artId)
        let destAccount = getAccount(destination)
        let destCollection = destAccount.capabilities.borrow<&{Art.CollectionPublic}>(Art.CollectionPublicPath)
        destCollection!.deposit(token: <- art)
    }
}
`;

export const removeFromSale = `
import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken
import Content, Art, Auction, Versus, Marketplace from 0xCONTRACT

transaction(artId: UInt64) {
    let artCollection:&Art.Collection
    let marketplace: &Marketplace.SaleCollection
    prepare(account: auth(StorageCapabilities, SaveValue,PublishCapability, BorrowValue) &Account) {
        if let marketplace = account.capabilities.borrow<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath) {
          self.marketplace=marketplace
        }else{
             let wallet=  account.capabilities.get<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)!
             let sale <- Marketplace.createSaleCollection(ownerVault: wallet)

             account.save<@Marketplace.SaleCollection>(<- sale, to:Marketplace.CollectionStoragePath)
             let cap = account.capabilities.storage.issue<&{Marketplace.SalePublic}>(Marketplace.CollectionStoragePath)
             account.capabilities.publish(cap, target:Marketplace.CollectionPublicPath)
             self.marketplace=account.stoarge.borrow<&Marketplace.SaleCollection>(from: Marketplace.CollectionStoragePath)!
        }

        self.artCollection= account.stoarge.borrow<&Art.Collection>(from: Art.CollectionStoragePath)!
    }

    execute {
        let art <- self.marketplace.withdraw(tokenID: artId) as! @NonFungibleToken.NFT
        self.artCollection.deposit(token: <- art)
    }
}
`;
