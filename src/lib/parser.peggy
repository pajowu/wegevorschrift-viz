Wegevorschrift =
	(CountryWegevorschrift / NoCountryWegevorschrift)+

Part =
	Name / Alternative

Alternative = "(" p1:Wegevorschrift "/" p2:Wegevorschrift ")" { return [p1, p2]; }

Name = str:$(NameNoBrackets/NameBrackets)+

NameNoBrackets = str:[^/*+<>()]+

NameBrackets = str:([(][^/*+<>()]+[)])

Country = 
	"<" cc:[0-9]+ ">" { return cc.join("") }
    
CountryWegevorschrift =
	c:Country way:Part |1.., "*"| { return {country:c, way} }

NoCountryWegevorschrift =
	way:Part |1.., "*"| { return {country:"1080", way} }
