import * as fcl from "@onflow/fcl";

export const getAllMarketplaceIDs = `
    import Marketplace from 0xCONTRACT
    pub fun main(address:Address): [UInt64] {
        let account = getAccount(address)
        let marketplaceCap = account.getCapability<&{Marketplace.SalePublic}>(Marketplace.CollectionPublicPath)
        if !marketplaceCap.check() {
            return []
        }
        let marketplace = marketplaceCap.borrow()!
        return marketplace.getIDs()
    }

`;

export const listForSale = `
import FungibleToken from 0xFungibleToken
import Content, Art, Auction, Versus, Marketplace from 0xCONTRACT

//TODO: This is not done, need to mint art first and then add it to the sale collection

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
