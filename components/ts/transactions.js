export const checkForTSCollection = `
import TopShot from 0xTOPSHOTADDRESS
pub fun main(address: Address): Bool {
    let account = getAccount(address)
    return account.getCapability<&{TopShot.MomentCollectionPublic}>(/public/MomentCollection).check()
}
`;

export const addTopShotCollection = `
import TopShot from 0xTOPSHOTADDRESS
transaction {
    prepare(acct: AuthAccount) {
        if acct.borrow<&TopShot.Collection>(from: /storage/MomentCollection) == nil {
            let collection <- TopShot.createEmptyCollection() as! @TopShot.Collection
            acct.save(<-collection, to: /storage/MomentCollection)
            acct.link<&{TopShot.MomentCollectionPublic}>(/public/MomentCollection, target: /storage/MomentCollection)
        }
    }
}
`;
