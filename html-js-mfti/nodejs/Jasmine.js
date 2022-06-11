describe("Multiple spies, when created manually", function() {
    var tape;
    beforeEach(function() {
        tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);
        tape.play();
        tape.pause();
        tape.rewind(0);
    });
    it("creates spies for each requested function", function() {
        expect(tape.play).toBeDefined();
        expect(tape.pause).toBeDefined();
        expect(tape.stop).toBeDefined();
        expect(tape.rewind).toBeDefined();
    });
    it("tracks that the spies were called", function() {
        expect(tape.play).toHaveBeenCalled();
        expect(tape.pause).toHaveBeenCalled();
        expect(tape.rewind).toHaveBeenCalled();
        expect(tape.stop).not.toHaveBeenCalled();
    });
    it("tracks all the arguments of its calls", function() {
        expect(tape.rewind).toHaveBeenCalledWith(0);
    });
});