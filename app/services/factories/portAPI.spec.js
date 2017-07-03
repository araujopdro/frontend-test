describe('Port API Factory Test', function() {
    var portAPI;
    beforeEach(angular.mock.module('devtest'));

    beforeEach(inject(function(_portAPI_) {
        portAPI = _portAPI_;
    }));

    it('PortsAPI Factory Should Exist', function() {
        expect(portAPI).toBeDefined();
    });

    describe('stringProcessing function test', function(){
        it('stringProcessing should transform \s in to %20', function(){
            expect(portAPI.stringProcessing('Filme')).toBe('Filme');
        });
        it('stringProcessing should transform \s in to %20', function(){
            expect(portAPI.stringProcessing('Filme A1')).toBe('Filme%20A1');
        });
        it('stringProcessing should transform \s in to %20', function(){
            expect(portAPI.stringProcessing('Filme A 2')).toBe('Filme%20A%202');
        });
        it('stringProcessing should transform \s in to %20', function(){
            expect(portAPI.stringProcessing('Quentin Tarantino')).toBe('Quentin%20Tarantino');
        });
        it('stringProcessing should transform \s in to %20', function(){
            expect(portAPI.stringProcessing('Kill Bill: Vol. 2')).toBe('Kill%20Bill:%20Vol.%202');
        });
    });



    
});