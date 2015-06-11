<?php

define('EMAIL_FOR_REPORTS', '');
define('RECAPTCHA_PRIVATE_KEY', '@privatekey@');
define('FINISH_URI', 'http://');
define('FINISH_ACTION', 'message');
define('FINISH_MESSAGE', 'Thanks for filling out my form!');
define('UPLOAD_ALLOWED_FILE_TYPES', 'doc, docx, xls, csv, txt, rtf, html, zip, jpg, jpeg, png, gif');

define('_DIR_', str_replace('\\', '/', dirname(__FILE__)) . '/');
require_once _DIR_ . '/handler.php';

?>

<?php if (frmd_message()): ?>
<link rel="stylesheet" href="<?php echo dirname($form_path); ?>/formoid-flat-green.css" type="text/css" />
<span class="alert alert-success"><?php echo FINISH_MESSAGE; ?></span>
<?php else: ?>
<!-- Start Formoid form-->
<link rel="stylesheet" href="<?php echo dirname($form_path); ?>/formoid-flat-green.css" type="text/css" />
<script type="text/javascript" src="<?php echo dirname($form_path); ?>/jquery.min.js"></script>
<form class="formoid-flat-green" style="background-color:#ffffff;font-size:14px;font-family:'Lato', sans-serif;color:#666666;max-width:480px;min-width:150px" method="post"><div class="title"><h2>Ajout de véhicule</h2></div>
	<div class="element-multiple<?php frmd_add_class("multiple"); ?>"><label class="title">Propriétaire</label><div class="large"><select data-no-selected="Nothing selected" name="multiple[]" multiple="multiple" >

		<option value="option 1">option 1</option>
		<option value="option 2">option 2</option>
		<option value="option 3">option 3</option></select></div></div>
	<div class="element-input<?php frmd_add_class("input1"); ?>"><label class="title">N° immatriculation</label><input class="large" type="text" name="input1" /></div>
	<div class="element-input<?php frmd_add_class("input2"); ?>"><label class="title">Modèle</label><input class="medium" type="text" name="input2" /></div>
	<div class="element-input<?php frmd_add_class("input3"); ?>"><label class="title">Marque</label><input class="medium" type="text" name="input3" /></div>
	<div class="element-input<?php frmd_add_class("input4"); ?>"><label class="title">Couleur</label><input class="medium" type="text" name="input4" /></div>
	<div class="element-input<?php frmd_add_class("input5"); ?>"><label class="title">Nombre de places</label><input class="small" type="text" name="input5" /></div>
	<div class="element-date<?php frmd_add_class("date"); ?>"><label class="title">Date d'ajout</label><input class="small" data-format="yyyy-mm-dd" type="date" name="date" placeholder="yyyy-mm-dd"/></div>
<div class="submit"><input type="submit" value="Enregistrer"/></div></form><script type="text/javascript" src="<?php echo dirname($form_path); ?>/formoid-flat-green.js"></script>

<!-- Stop Formoid form-->
<?php endif; ?>

<?php frmd_end_form(); ?>