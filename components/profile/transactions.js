import * as fcl from "@onflow/fcl";

export const fetchVersusDrop = `
// This script checks that the accounts are set up correctly for the marketplace tutorial.
//
//emulator
// import NonFungibleToken, Content, Art, Auction, Versus from 0xf8d6e0586b0a20c7
//testnet
import Auction, Versus from 0xCONTRACT
/*
  Script used to get the first active drop in a versus 
 */
access(all) fun main(dropID: UInt64) : Versus.DropStatus {
		return Versus.getDrop(dropID)!
}
`;

export const fetchVersusArt = `
//testnet
import Versus from 0xCONTRACT
access(all) fun main(dropId: UInt64) : String {
  return Versus.getArtForDrop(dropId)!
}
`;

export const fetchMyArt = `
/*
  This script will check an address and print out its FT, NFT and Versus resources
 */
import Art from 0xCONTRACT
access(all) fun main(address:Address) : [Art.ArtData] {
    return Art.getArt(address: address)
}
`;

export const fetchOneArt = `
import Versus, Art from 0xCONTRACT
access(all) fun main(address:Address, artId:UInt64) : String? {
  return Art.getContentForArt(address: address, artId: artId)
}`;

export const fetchOneUser = `
import FungibleToken from 0xFungibleToken
/*
  This script will check an address and print out its FT, NFT and Versus resources
 */
access(all) fun main(address:Address) : UFix64 {
    // get the accounts' public address objects
    let account = getAccount(address)
    let balance = 0.0
    
    if let vault= account.capabilities.borrow<&{FungibleToken.Balance}>(/public/flowTokenBalance) {
       return vault.balance
    }
    return balance
}
`;

export const connectArtCollection = `
import NonFungibleToken from 0xNonFungibleToken
import Art from 0xCONTRACT
//This transaction will setup a drop in a versus auction
transaction() {
    prepare(account: auth(StorageCapabilities, SaveValue,PublishCapability, BorrowValue) &Account) {
        account.save<@NonFungibleToken.Collection>(<- Art.createEmptyCollection(), to: Art.CollectionStoragePath)
        let cap = account.capabilities.storage.issue<&{Art.CollectionPublic}>(Art.CollectionStoragePath)
        account.capabilities.publish(cap.CollectionPublicPath, target:Art.CollectionStoragePath)
    }
}
`;

export const checkForArtConnection = `
import Art from 0xCONTRACT
access(all) fun main(address: Address): Bool {
  let account = getAccount(address)
  var collectionCap = account.capabilities.get<&{Art.CollectionPublic}>(Art.CollectionPublicPath)
  return collectionCap !=nil
}
`;

export const profileGet = `
import Profile from 0xPROFILE

access(all) fun main(address:Address) : Profile.UserProfile? {
  return getAccount(address).capabilities.borrow<&{Profile.Public}>(Profile.publicPath)?.asProfile()
}
`;

export const profileEdit = `
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import Profile, Art, Marketplace from 0xCONTRACT
import NonFungibleToken from 0xNonFungibleToken

transaction(name: String, description: String, avatar: String, socials: {String: String}) {
    prepare(acct: auth(StorageCapabilities, SaveValue,PublishCapability, BorrowValue) &Account) {

    let profile <-Profile.createUser(name:name, description: description, allowStoringFollowers:true, tags:["versus"])

    let flowReceiver= acct.capabilities.get<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
    let flowBalance= acct.capabilities.get<&{FungibleToken.Balance}>(/public/flowTokenBalance)
    let flow=acct.storage.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!

    let flowWallet= Profile.Wallet(name:"Flow", receiver: flowReceiver, balance: flowBalance, accept:flow.getType(), tags: ["flow"])
    profile.addWallet(flowWallet)

    var collectionCap = acct.capabilities.get<&{Art.CollectionPublic}>(Art.CollectionPublicPath)
    // if collection is not created yet we make it.
    if collectionCap == nil {
        // store an empty NFT Collection in acct storage
        acct.save<@NonFungibleToken.Collection>(<- Art.createEmptyCollection(), to: Art.CollectionStoragePath)
        let cap = account.capabilities.storage.issue<&{Art.CollectionPublic}>(Art.CollectionStoragePath)
        account.capabilities.publish(cap, target:Art.CollectionStoragePath)
    }
    
    profile.addCollection(Profile.ResourceCollection( 
      name: "VersusArt", 
      collection:collectionCap, 
      type: Type<&{Art.CollectionPublic}>(),
      tags: ["versus", "nft"]))

    profile.setAvatar(avatar)

    for key in socials.keys {
      let value = socials[key]
      profile.addLink(Profile.Link(key, key, value!))
    }

    acct.save(<-profile, to: Profile.storagePath)
    let pcap = account.capabilities.storage.issue<&{Profile>Public}>(Profile.storagePath)
    account.capabilities.publish(pcap, target:Profile.storagepath)
  }
}
`;

export const profileChange = `
  import Profile from 0xPROFILE

  transaction(name: String, description: String, avatar: String, socials: {String: String}) {
    prepare(account: auth(StorageCapabilities, SaveValue,PublishCapability, BorrowValue) &Account) {

      let profile = account.storage.borrow<&Profile.User{Profile.Owner}>(from: Profile.storagePath)!
      profile.setName(name)
      profile.setDescription(description)
      profile.setAvatar(avatar)

      for key in socials.keys {
        let value = socials[key]
        profile.addLink(Profile.Link(key, key, value!))
      }
    }
  }
`;

export const followUser = `
  import Profile from 0xPROFILE

  transaction(address: Address) {
    prepare(account: auth(StorageCapabilities, SaveValue,PublishCapability, BorrowValue) &Account) {
      let profile = account.storage.borrow<&Profile.User{Profile.Owner}>(from: Profile.storagePath)!
      profile.follow(address, tags:["versus"])
    }
  }
`;

export const unfollowUser = `
  import Profile from 0xPROFILE

  transaction(address: Address) {
    prepare(account: auth(StorageCapabilities, SaveValue,PublishCapability, BorrowValue) &Account) {
      let profile = account.borrow<&Profile.User{Profile.Owner}>(from: Profile.storagePath)!
      profile.unfollow(address)
    }
  }
`;

export const getFindProfile = `
  import FIND from 0xFIND

  access(all) fun main(name: String) : Address? {
    return FIND.lookupAddress(name) 
  } 
`;

export const getFindProfileInfo = `
  import FIND, Profile from 0xFIND

  access(all) fun main(name: String): Profile.UserProfile? {
      return FIND.lookup(name)?.asProfile()
  }
`;
