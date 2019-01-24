<form method="post" action="week03.php">
    <div>
        <label>Name</label>
        <input type="text" name="name">
    </div>

    <div>
        <label>Email</label>
        <input type="text" name="email">
    </div>

    <?php
        $array = array(
            (object) [
                'name' => 'Computer Science',
                'abbreviation' => 'CS',
            ],
            (object) [
                'name' => 'Web Design and Development',
                'abbreviation' => 'WD',
            ],
            (object) [
                'name' => 'Computer information Technology',
                'abbreviation' => 'CIT',
            ],
            (object) [
                'name' => 'Computer Engineering',
                'abbreviation' => 'CE',
            ],
        );
    foreach( $array as $major ) {
        print '<div>';
        print '<input type="radio" name="major" id="' . $major->abbreviation . '" value="' . $major->name . '">';
        print '<label for="' . $major->abbreviation . '">' . $major->name . '</label>';
        print '</div>';
        }
?>


    <div>
        <label>Comments</label>
        <textarea name="comments"></textarea>
    </div>

    <label>Continents</label>
    <div>
        <input type="checkbox" name="continents[]" value="NA" id="na">
        <label for="na">North America</label>
    </div>

    <div>
        <input type="checkbox" name="continents[]" value="SA" id="sa">
        <label for="sa">South America</label>
    </div>



    <div>
        <input type="checkbox" name="continents[]" value="EU" id="europe">
        <label for="europe">Europe</label>
    </div>



    <div>
        <input type="checkbox" name="continents[]" value="AS" id="asia">
        <label for="asia">Asia</label>
    </div>



    <div>
        <input type="checkbox" name="continents[]" value="AU" id="Australia">
        <label for="Australia">Australia</label>
    </div>

    <div>
        <input type="checkbox" name="continents[]" value="AF" id="Africa">
        <label for="Africa">Africa</label>
    </div>
    <div>
        <input type="checkbox" name="continents[]" value="AT" id="Antarctica">
        <label for="Antarctica">Antarctica</label>
    </div>

    <button type="submit">submit</button>
</form>
