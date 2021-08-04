import * as fcl from "@onflow/fcl";

export const getOneMarketplaceItem = `
    import Marketplace from 0xCONTRACT
    pub fun main(address:Address, tokenID: UInt64): Marketplace.MarketplaceData {
        let account = getAccount(address)
        let marketplaceCap = account.getCapability<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath)
        let marketplace = marketplaceCap.borrow()!
        return marketplace.getSaleItem(tokenID: tokenID)
    }

`;

export const getMarketpaceItems = `
    import Marketplace from 0xCONTRACT
    pub fun main(address:Address): [Marketplace.MarketplaceData] {
        let account = getAccount(address)
        let marketplaceCap = account.getCapability<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath)
        if !marketplaceCap.check() {
            return []
        }
        let marketplace = marketplaceCap.borrow()!
        return marketplace.listSaleItems()
    }

`;

export const getArtContent = `
    import Marketplace from 0xCONTRACT
    pub fun main(address: Address, tokenID: UInt64): String {
        let account = getAccount(address)
        let marketplaceCap = account.getCapability<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath)
        if !marketplaceCap.check() {
            return ""
        }
        let marketplace = marketplaceCap.borrow()!
        return marketplace.getContent(tokenID: tokenID)
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
    
        prepare(account: AuthAccount) {
    
            // get the references to the buyer's Vault and NFT Collection receiver
            var collectionCap = account.getCapability<&{Art.CollectionPublic}>(Art.CollectionPublicPath)
    
            // if collection is not created yet we make it.
            if !collectionCap.check() {
                // store an empty NFT Collection in account storage
                account.save<@NonFungibleToken.Collection>(<- Art.createEmptyCollection(), to: Art.CollectionStoragePath)
    
                // publish a capability to the Collection in storage
                account.link<&{Art.CollectionPublic}>(Art.CollectionPublicPath, target: Art.CollectionStoragePath)
            }
    
            self.collectionCap=collectionCap
            
            self.vaultCap = account.getCapability<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
                       
            let vaultRef = account.borrow<&FungibleToken.Vault>(from: /storage/flowTokenVault)
                ?? panic("Could not borrow owner's Vault reference")
    
            // withdraw tokens from the buyer's Vault
            self.temporaryVault <- vaultRef.withdraw(amount: amount)
        }
    
        execute {
            // get the read-only account storage of the seller
            let seller = getAccount(marketplace)
    
            let marketplace= seller.getCapability(Marketplace.CollectionPublicPath).borrow<&{Marketplace.SalePublic}>()
                             ?? panic("Could not borrow seller's sale reference")
    
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
    prepare(account: AuthAccount) {
        let marketplaceCap = account.getCapability<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath)
        // if sale collection is not created yet we make it.
        if !marketplaceCap.check() {
             let wallet=  account.getCapability<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
             let sale <- Marketplace.createSaleCollection(ownerVault: wallet)

            // store an empty NFT Collection in account storage
            account.save<@Marketplace.SaleCollection>(<- sale, to:Marketplace.CollectionStoragePath)

            // publish a capability to the Collection in storage
            account.link<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath, target: Marketplace.CollectionStoragePath)
        }

        self.marketplace=account.borrow<&Marketplace.SaleCollection>(from: Marketplace.CollectionStoragePath)!
        self.artCollection= account.borrow<&Art.Collection>(from: Art.CollectionStoragePath)!
    }

    execute {
        let art <- self.artCollection.withdraw(withdrawID: artId) as! @Art.NFT
        self.marketplace.listForSale(token: <- art, price: 5.0)
        self.marketplace.changePrice(tokenID: artId, newPrice: price)
    }
}
`;

export const removeFromSale = `
import FungibleToken from 0xFungibleToken
import Content, Art, Auction, Versus, Marketplace from 0xCONTRACT

transaction(artId: UInt64) {
    let artCollection:&Art.Collection
    let marketplace: &Marketplace.SaleCollection
    prepare(account: AuthAccount) {
        let marketplaceCap = account.getCapability<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath)
        // if sale collection is not created yet we make it.
        if !marketplaceCap.check() {
             let wallet=  account.getCapability<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
             let sale <- Marketplace.createSaleCollection(ownerVault: wallet)

            // store an empty NFT Collection in account storage
            account.save<@Marketplace.SaleCollection>(<- sale, to:Marketplace.CollectionStoragePath)

            // publish a capability to the Collection in storage
            account.link<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath, target: Marketplace.CollectionStoragePath)
        }

        self.marketplace=account.borrow<&Marketplace.SaleCollection>(from: Marketplace.CollectionStoragePath)!
        self.artCollection= account.borrow<&Art.Collection>(from: Art.CollectionStoragePath)!
    }

    execute {
        self.marketplace.withdraw(tokenID: artId)
        // self.artCollection.deposit(token: ) as! @Art.NFT
    }
}
`;
