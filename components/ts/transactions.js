export const checkForTSCollection = `
import TopShot from 0xTOPSHOTADDRESS
access(all) fun main(address: Address): Bool {
    let account = getAccount(address)
    return account.capabilities.get<&{TopShot.MomentCollectionPublic}>(/public/MomentCollection) != nil
}
`;

export const addTopShotCollection = `
import TopShot from 0xTOPSHOTADDRESS
transaction {

    prepare(acct: auth(BorrowValue) &Account) {
        if acct.storage.borrow<&TopShot.Collection>(from: /storage/MomentCollection) == nil {
            let collection <- TopShot.createEmptyCollection() as! @TopShot.Collection
            acct.save(<-collection, to: /storage/MomentCollection)
            acct.link<&{TopShot.MomentCollectionPublic}>(/public/MomentCollection, target: /storage/MomentCollection)
        }
    }
}
`;
