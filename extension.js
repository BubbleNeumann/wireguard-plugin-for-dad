const {St, GLib, Clutter} = imports.gi;
const Main = imports.ui.main;

const wgup = '';
const wgdown = '';

let panelButton, panelButtonText;
let is_enabled = false; // global status

function init () {
  panelButton = new St.Bin({
    track_hover: true,
    reactive: true,
    can_focus: true,
  });
  panelButtonText = new St.Label({
    y_align: Clutter.ActorAlign.CENTER,
  });
  panelButtonText.set_text("🌚"); // wg is down on sturtup
  panelButton.set_child(panelButtonText);
  panelButton.connect("button-press-event", () => {
    is_enabled = !is_enabled;
    if (is_enabled) {
      GLib.spawn_command_line_async('pkexec ' + wgup);
      panelButtonText.set_text("🌝");
    } else {
      GLib.spawn_command_line_async('pkexec ' + wgdown);
      panelButtonText.set_text("🌚");
    }
  });
}

function enable () {
  Main.panel._rightBox.insert_child_at_index(panelButton, 0);
}

function disable () {
  Main.panel._rightBox.remove_child(panelButton);
}
