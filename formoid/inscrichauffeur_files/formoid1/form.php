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
<form class="formoid-flat-green" style="background-color:#ffffff;font-size:14px;font-family:'Lato', sans-serif;color:#666666;max-width:480px;min-width:150px" method="post"><div class="title"><h2>Inscription propriétaire</h2></div>
	<div class="element-input<?php frmd_add_class("input"); ?>"><label class="title">Nom</label><input class="large" type="text" name="input" /></div>
	<div class="element-input<?php frmd_add_class("input1"); ?>"><label class="title">Prenoms</label><input class="large" type="text" name="input1" /></div>
	<div class="element-input<?php frmd_add_class("input2"); ?>"><label class="title">Contact 1</label><input class="medium" type="text" name="input2" /></div>
	<div class="element-input<?php frmd_add_class("input3"); ?>"><label class="title">Contact 2</label><input class="medium" type="text" name="input3" /></div>
	<div class="element-input<?php frmd_add_class("input4"); ?>"><label class="title">Adresse</label><input class="large" type="text" name="input4" /></div>
	<div class="element-input<?php frmd_add_class("input5"); ?>"><label class="title">Longitude</label><input class="small" type="text" name="input5" /></div>
	<div class="element-input<?php frmd_add_class("input6"); ?>"><label class="title">Latitude</label><input class="small" type="text" name="input6" /></div>
	<div class="element-input<?php frmd_add_class("input9"); ?>"><label class="title">N° permis de conduire</label><input class="large" type="text" name="input9" /></div>
	<div class="element-input<?php frmd_add_class("input7"); ?>"><label class="title">N° CNI</label><input class="large" type="text" name="input7" /></div>
	<div class="element-date<?php frmd_add_class("date"); ?>"><label class="title">Date inscription</label><input class="medium" data-format="yyyy-mm-dd" type="date" name="date" placeholder="yyyy-mm-dd"/></div>
	<div class="element-email<?php frmd_add_class("email"); ?>"><label class="title">Email</label><input class="large" type="email" name="email" value="" /></div>
	<div class="element-input<?php frmd_add_class("input8"); ?>"><label class="title">Login</label><input class="large" type="text" name="input8" /></div>
	<div class="element-password<?php frmd_add_class("password"); ?>"><label class="title">Mot de passe</label><input class="large" type="password" name="password" value="" /></div>
<div class="submit"><input type="submit" value="Enregistrer"/></div></form><script type="text/javascript" src="<?php echo dirname($form_path); ?>/formoid-flat-green.js"></script>

<!-- Stop Formoid form-->
<?php endif; ?>

<?php frmd_end_form(); ?>