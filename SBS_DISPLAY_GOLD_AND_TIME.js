//=============================================================================
// DisplayGoldAndPlaytime.js
//=============================================================================

/*:
 * @plugindesc Displays gold and playtime on the top right corner of the screen.
 * 
 * @author SOULBONDSOUL
 * 
 * @help This plugin displays the player's gold and playtime on the top right
 * corner of the screen.
 * 
 * @param GoldText
 * @text Gold Text
 * @desc The text to display before the gold amount.
 * @default Gold:
 * 
 * @param TimeText
 * @text Time Text
 * @desc The text to display before the playtime.
 * @default Time:
 * 
 * @param FontSize
 * @text Font Size
 * @desc The font size for the display.
 * @type number
 * @default 20
 * 
 */

(function() {
    var parameters = PluginManager.parameters('DisplayGoldAndPlaytime');
    var goldText = String(parameters['GoldText'] || 'GOLD:');
    var timeText = String(parameters['TimeText'] || 'Time:');
    var fontSize = Number(parameters['FontSize'] || 20);

    // Create a window to display gold and playtime
    function Window_GoldAndPlaytime() {
        this.initialize.apply(this, arguments);
    }

    Window_GoldAndPlaytime.prototype = Object.create(Window_Base.prototype);
    Window_GoldAndPlaytime.prototype.constructor = Window_GoldAndPlaytime;

    Window_GoldAndPlaytime.prototype.initialize = function() {
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x = Graphics.boxWidth - width;
        var y = 0;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_GoldAndPlaytime.prototype.windowWidth = function() {
        return 240;
    };

    Window_GoldAndPlaytime.prototype.windowHeight = function() {
        return this.fittingHeight(2);
    };

    Window_GoldAndPlaytime.prototype.refresh = function() {
        this.contents.clear();
        this.drawGold();
        this.drawPlaytime();
    };

    Window_GoldAndPlaytime.prototype.drawGold = function() {
        var x = 0;
        var y = 0;
        var width = this.contentsWidth();
        this.drawText(goldText, x, y, width, 'left');
        this.drawText($gameParty.gold(), x, y, width, 'right');
    };

    Window_GoldAndPlaytime.prototype.drawPlaytime = function() {
        var x = 0;
        var y = this.lineHeight();
        var width = this.contentsWidth();
        this.drawText(timeText, x, y, width, 'left');
        this.drawText($gameSystem.playtimeText(), x, y, width, 'right');
    };

    // Add the window to the screen
    var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this.createGoldAndPlaytimeWindow();
    };

    Scene_Map.prototype.createGoldAndPlaytimeWindow = function() {
        this._goldAndPlaytimeWindow = new Window_GoldAndPlaytime();
        this.addWindow(this._goldAndPlaytimeWindow);
    };

    // Update gold and playtime in real-time
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'UpdateGoldAndPlaytime') {
            this._goldAndPlaytimeWindow.refresh();
        }
    };

    // Extend the maximum playtime limit to 9999:59:59
    var _Game_System_prototype_playtime = Game_System.prototype.playtime;
    Game_System.prototype.playtime = function() {
        var time = _Game_System_prototype_playtime.call(this);
        var seconds = Math.floor(time / 60);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        if (hours >= 9999) {
            return '9999:59:59';
        } else {
            return _Game_System_prototype_playtime.call(this);
        }
    };
})();