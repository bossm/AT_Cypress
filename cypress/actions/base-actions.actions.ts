export class baseActions {
    static check_matomo(actual, expected): {} {
        var keys_to_check = ['fa_ef', 'e_c', 'e_a', 'e_n', 'e_v', 'fa_id', '', 'action_name']
        var keys_to_not_check = ['dimension11', 'dimension25', 'dimension7', 'dimension21']
        for (var prop in expected) {
            if (keys_to_check.includes(prop)) {
                if (actual[prop] !== expected[prop]) {
                    return false
                }
            }
        }
        return true
    }
}
