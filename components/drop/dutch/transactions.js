export const fetchDutchDrop = `
    import DutchAuction from 0xCONTRACT
    pub fun main(id: UInt64) : DutchAuction.DutchAuctionStatus {
        return DutchAuction.getDutchAuction(id)!
    }
`;

export const makeDutchBid = `
import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken
import Versus, DutchAuction, Art from 0xCONTRACT

// Transaction to make a bid in a marketplace for the given dropId and auctionId
transaction(marketplace: Address, id: UInt64, bidAmount: UFix64) {
	// reference to the buyer's NFT collection where they
	// will store the bought NFT

	let vaultCap: Capability<&{FungibleToken.Receiver}>
	let collectionCap: Capability<&{NonFungibleToken.Receiver}> 
	let dutchAuctionCap: Capability<&DutchAuction.BidCollection{DutchAuction.BidCollectionPublic}>
	let temporaryVault: @FungibleToken.Vault

	prepare(account: AuthAccount) {

		// get the references to the buyer's Vault and NFT Collection receiver
		let collectionCap=  account.getCapability<&{NonFungibleToken.Receiver}>(/public/versusArtNFTCollection)

		// if collection is not created yet we make it.
		if !collectionCap.check() {
			account.unlink(/public/versusArtNFTCollection)

			account.unlink(Art.CollectionPublicPath)
			destroy <- account.load<@AnyResource>(from:Art.CollectionStoragePath)
			// store an empty NFT Collection in account storage
			account.save<@NonFungibleToken.Collection>(<- Art.createEmptyCollection(), to: Art.CollectionStoragePath)

			// publish a capability to the Collection in storage
			account.link<&{Art.CollectionPublic}>(Art.CollectionPublicPath, target: Art.CollectionStoragePath)

			//publish the standard link
			account.link<&{NonFungibleToken.Receiver}>(/public/versusArtNFTCollection, target: Art.CollectionStoragePath)
		}

		let bidCap=account.getCapability<&DutchAuction.BidCollection{DutchAuction.BidCollectionPublic}>(DutchAuction.BidCollectionPublicPath)
		if ! bidCap.check() {

			account.unlink(DutchAuction.BidCollectionPublicPath)
			destroy <- account.load<@AnyResource>(from:DutchAuction.BidCollectionStoragePath)

			let collection <- DutchAuction.createEmptyBidCollection()
			account.save(<- collection, to: DutchAuction.BidCollectionStoragePath)
			account.link<&DutchAuction.BidCollection{DutchAuction.BidCollectionPublic}>(DutchAuction.BidCollectionPublicPath, target: DutchAuction.BidCollectionStoragePath)
		}

		self.dutchAuctionCap=bidCap
		self.collectionCap=collectionCap

		self.vaultCap = account.getCapability<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)

		let vaultRef = account.borrow<&FungibleToken.Vault>(from: /storage/flowTokenVault) ?? panic("Could not borrow owner's Vault reference")

		self.temporaryVault <- vaultRef.withdraw(amount: bidAmount)
	}

	execute {
		self.dutchAuctionCap.borrow()!.bid(marketplace: marketplace, id: id, vault: <- self.temporaryVault, vaultCap: self.vaultCap, nftCap: self.collectionCap)
	}
}
`;

export const getAuctionBids = `
    import DutchAuction from 0xCONTRACT
    pub fun main(id: UInt64) : DutchAuction.Bids {
        return DutchAuction.getBids(id)
    }
`;

export const getAddressDutchBids = `
	import DutchAuction from 0xCONTRACT

	pub fun main(address: Address, auction: UInt64) : [DutchAuction.ExcessFlowReport]   {
		let account=getAccount(address)
		let bidCollection=account.getCapability<&DutchAuction.BidCollection{DutchAuction.BidCollectionPublic}>(DutchAuction.BidCollectionPublicPath).borrow()!
		var reports :[DutchAuction.ExcessFlowReport] =[]
		for bid in bidCollection.getIds() {
			let report=bidCollection.getReport(bid)
			if report.auctionId==auction {
				reports.append(bidCollection.getReport(bid))
			}
		}
		return reports
	}
`;

export const cancelDutchBid = `
	import DutchAuction from 0xCONTRACT
	transaction(id: UInt64) {
		let dutchAuction: &DutchAuction.BidCollection
		prepare(account: AuthAccount) {
			self.dutchAuction=account.borrow<&DutchAuction.BidCollection>(from: DutchAuction.BidCollectionStoragePath) ?? panic("Could not borrow bid collection")
		}
		execute {
			self.dutchAuction.cancelBid(id)
		}
		post {
			!self.dutchAuction.getIds().contains(id) : "Should not contain bid"
		}
	}
`;

export const withdrawExcess = `
	import FungibleToken from 0xFungibleToken
	import DutchAuction from 0xCONTRACT

	transaction(id: UInt64) {
		let vaultCap: Capability<&{FungibleToken.Receiver}>
		let dutchAuction: &DutchAuction.BidCollection
		prepare(account: AuthAccount) {
			self.dutchAuction=account.borrow<&DutchAuction.BidCollection>(from: DutchAuction.BidCollectionStoragePath) ?? panic("Could not borrow bid collection")
			self.vaultCap = account.getCapability<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
		}
		execute {
			self.dutchAuction.withdrawExcessFlow(id: id, vaultCap: self.vaultCap)
		}
	}
`;
