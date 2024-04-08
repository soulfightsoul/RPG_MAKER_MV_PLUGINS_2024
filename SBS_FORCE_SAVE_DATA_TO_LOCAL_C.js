//=============================================================================
// FORCE_SAVE_DATA_TO_LOCAL_C.js
//=============================================================================

/*:
 * @plugindesc Forces the save files to be stored in C:\save directory.
 * @author SOULBONDSOUL
 *
 * @help This plugin forces the save files to be stored in the C:\save directory.
 */

(function() {
    var _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;

    DataManager.makeSavefileInfo = function() {
        var info = _DataManager_makeSavefileInfo.call(this);
        info.globalId = 'save';
        return info;
    };

    var _StorageManager_localFilePath = StorageManager.localFilePath;

    StorageManager.localFilePath = function(savefileId) {
        if (savefileId < 0) {
            return this.localFileDirectoryPath() + 'config.rpgsave';
        } else {
            return this.localFileDirectoryPath() + 'file' + savefileId + '.rpgsave';
        }
    };

    StorageManager.localFileDirectoryPath = function() {
        return 'C:/save/';
    };
})();